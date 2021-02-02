const request=require('request')
const geocode=(address,callback)=>{
    const geocodeurl='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiYW1hbmphaXN3YWwxMjMiLCJhIjoiY2tqMWtwOTRuMGx1MzMwbWgzbmZpOXJ2OSJ9.UTCn9TiqztF2lL5rAS1dhg'
     request({url: geocodeurl , json:true}, (error, res)=>{
         if(error)
         {
             callback('unable to connect', undefined)
         }else if(res.body.features.length===0)
         {
             callback('data is not available', undefined)
         }else{
             callback(undefined,  {
                latitude: res.body.features[0].center[0],
                  longitude: res.body.features[0].center[1],
                 location : res.body.features[0].place_name
             })
         }

     })
}

module.exports=geocode