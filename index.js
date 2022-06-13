const express = require('express')

const mongoose = require('mongoose')
const fs = require('fs')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'});

const tourRoutes = require('./router/tourRoutes')
const aggregateRoutes = require('./router/aggregationRoutes')
const userRoutes = require('./router/userRoutes')
const loginRoutes  = require('./router/login')

const appError = require('./utils/error')

const app = express();
app.use(express.json())



app.use('/api/v1/tours',tourRoutes)
app.use('/api/tour-stats',aggregateRoutes)
app.use('/signup',userRoutes)
app.use('/login',loginRoutes)
app.use('/forgotPassword',loginRoutes)
app.use('/resetPassword',loginRoutes)

app.get('/',(req,res)=>{
    res.send('HELLO WORLD!!!!!!')
})

// All Routes and API Error Handling
app.all('*',(req,res,next)=>{
    res.status(404).json({
        status:'fail',
        message:`Can't find ${req.originalUrl} on this server`
    })
});

// ERROR HANDLING Middleware
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
});



const db = process.env.DATABASE.replace('<password>',process.env.db_password)
mongoose.connect(db,{
    useNewUrlParser:true              
})
.then(con =>{
    console.log('DB Connection successfull')
});





const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`app is running in ${PORT}`);
})