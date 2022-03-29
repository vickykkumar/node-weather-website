const request = require('request')


// request({url:url, json:true},(error,response)=>{
//     if(error)
//     {
//         console.log('unable to connect wheather api')
//     }else if(response.body.error){
//         console.log('unable to find location')
//     }
//     else{
//         console.log(`${response.body.current.weather_descriptions[0]} It is currently ${response.body.current.temperature} degree out.There is ${response.body.current.feelslike} of rain`)
//     }
// })


const weather=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=9826fd3ecbebb667b9cfbbca4dbd56cd&query=${latitude},${longitude}&units=f`
    request({url:url, json:true},(error, response)=>{
        if(error)
        {
            callback('unable to open wheather api', undefined)
        }else if(response.body.error)
        {
            callback('unable to find location', undefined)
        }else{
            callback(undefined,{
                weather: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feels_like:response.body.current.feelslike
            })
        }
    })

}

module.exports=weather