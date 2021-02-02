const request=require('request')

const  forecast= (address, callback)=>{
    const url=`http://api.openweathermap.org/data/2.5/weather?q=${address}&appid=0868711b382a752cbf2b3257de219f0e`
  request({url: url, json:true}, (error, {body})=>{
      if(error)
      {
          callback('unable to connect the server', undefined)
      }else if(body.error)
      {
          callback('unable to find data', undefined)
      }else{
          callback(undefined,{
            description : body.weather[0].description,
            temperature : body.main.temp,
            humidity: body.main.humidity,
            wind_speed : body.wind.speed,
            city_name : body.name
          })
      }
  })
}

module.exports=forecast