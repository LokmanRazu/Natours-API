const express = require('express')

const mongoose = require('mongoose')
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})

const tourRoutes = require('./router/tourRoutes')
const aggregateRoutes = require('./router/aggregationRoutes')

const app = express()
app.use(express.json())



// const tours =  JSON.parse(fs.readFileSync('./txt/node-farm.json'))

// app.get('/api/v1/tours', (req,res)=>{
//     res.status(200).json({
//         status:'active',
//         results:tours.length,
//         data:{
//             tours:tours
//         }
//     })
// })

app.use('/api/v1/tours',tourRoutes)
app.use('/api/tour-stats',aggregateRoutes)

app.get('/',(req,res)=>{
    res.send('HELLO WORLD!!!!!!')
})

app.use((error,req,res,next)=>{
    console.log(error)
})

// All Routes and API Error Handling
app.all('*',(req,res,next)=>{
    res.status(404).json({
        status:'fail',
        message:`Can't find ${req.originalUrl} on this server`
    })
})

const db = process.env.DATABASE.replace('<password>',process.env.db_password)
mongoose.connect(db,{
    useNewUrlParser:true              
})
.then(con =>{
    console.log('DB Connection successfull')
})





const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`app is running in ${PORT}`)
})