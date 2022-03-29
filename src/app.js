const path=require('path')
const geocode=require(path.join(__dirname,'../utils/geocode'))
const weather=require(path.join(__dirname,'../utils/wheather'))
const express=require('express')

console.log(__dirname)
// console.log(__filename)

console.log(path.join(__dirname,'../public'))
const app=express()

const publicDirectoryPath=path.join(__dirname,'../public')

app.set('view engine', 'hbs')

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather-app',
        name:'vicky'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Please provide address'
        })
    }

    geocode(req.query.address,(error,data)=>{

        if(error)
        {
            return res.send({
                error:error
            })
        }
        weather(data.latitude, data.longitude, (error, forcastdata)=>{
            if(error)
            {
                return res.send({
                    error:error
                })
            }
            res.send({
                location: data.location,
                data : forcastdata
            })
            // console.log('location: ', data.location)
            // console.log('data', forcastdata)
        })
    })

    // res.send({
    //     location:req.query.address,
    //     temprature:45
    // })
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    res.send({
        products:[]
    })
})

//app.com
//app.com/help
//app.com/about

app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})