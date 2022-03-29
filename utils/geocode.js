const request=require('request')


// request({url:geourl, json:true},(error,response)=>{
//     if(error)
//     {
//         console.log('unable to connect to Geocode')
//     }else if(response.body.message)
//     {
//         console.log(response.body.message)
//     }else if(response.body.features.length==0){
//         console.log('unable to find location')
//     }
//     else{
//     console.log(response.body.features[0].center[0] + ' latitude ' +response.body.features[0].center[1])
//     }
// })


const geocode=(address,callback)=>{
    const geourl=`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoidmlja3lra3VtYXQiLCJhIjoiY2tnejZpc2kyMG9zMTJxcGNmZGN4eXI5OSJ9.F6qql5kBvkV4xBiM4zcqDg&limit=1`
    request({url:geourl, json:true},(error,response)=>{
        if(error)
        {
            callback('unable to connect to Geocode', undefined)
        }else if(response.body.message)
        {
            console.log(response.body.message)
        }else if(response.body.features.length==0){
            callback('unable to find location', undefined)
        }
        else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports=geocode