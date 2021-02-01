console.log('this is a client server')


const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value

    messageOne.textContent='Loading....'
     messageOne.textContent=''
    fetch('http://localhost:3000/weather?address='+ location).then((res)=>{
    //console.log(res)
    res.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent=data.error
            
        }else{
           // messageOne.textContent=data.location
           // messageOne.textContent=data.forecastdata.description
            messageOne.textContent=`Location: ${data.forecastdata.city_name}, 
            Description: ${data.forecastdata.description},  Temperature: ${data.forecastdata.humidity},
            Humidity: ${data.forecastdata.humidity}, Wind_speed: ${data.forecastdata.wind_speed}`
           
        }
    })
})

})