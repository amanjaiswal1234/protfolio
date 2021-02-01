const express=require('express')
const path=require('path')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')
const app=express()
const pathDirName=path.join(__dirname, '../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

app.use(express.static(pathDirName))

app.get('/', (req, res)=>{
    res.render('index', {
        helpText1 : 'CHAT APP ',
        helpText2 : 'WEATHER APP',
        title: 'MY PROTFOLIO',
        name : 'Aman jaiswal'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        helpText1 : 'C/C++ ',
        helpText2 : 'JAVASCRIPT',
        helpText3 : 'HTML',
        helpText4 : 'CSS',
        helpText5 : 'NODE.JS',
        helpText6 : 'EXPRESS.JS',
        helpText7 : 'MYSQL',
        helpText8 : 'MONGODB',
        title: 'SKILLS',
        name: 'Aman jaiswal'
    })
})
app.get('/about', (req,res)=>{
    res.render('about', {
        helpText1 : 'MY NAME- AMAN KUMAR',
        helpText2 : 'DEGREE- B.TECH',
        helpText3 : 'COLLEGE NAME- IIIT UNA',
        helpText4 : 'BRANCH- ECE',
        title : 'About Me',
        name : 'Aman jaiswal'
    })
})


app.get('/weather', (req,res)=>{
    
    if(!req.query.address)
    {
        res.send({
            error: 'You must provide an address'
        })
    }
   
    forecast(req.query.address, (error, forecastdata)=>{
        if(error)
        {
           return res.send({error})
        }
        geocode(forecastdata.city_name , (error, data)=>{
            if(error)
            {
                return res.send({error})
            }
            res.json({
                location:  (data.location),
                forecastdata:(forecastdata) 
            })
           // console.log('location: ', data.location)
           // console.log('forecastdata', forecastdata)
        })
    })
    
   // })

    /*res.send({
        forcast: 'it is snowing ',
        location: 'patna',
        address: req.query.address
    }) */
})

app.get('/products', (req,res)=>{
    if(!req.query.search)
    {
      return   res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404',
        name : 'Aman jaiswal',
        errorMessage :'Help article not found'
    })
})
app.get('*', (req,res)=>{
    res.render('404', {
        title: '404',
        name : 'Aman jaiswal',
        errorMessage :'Page not found'
    })
})
app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})