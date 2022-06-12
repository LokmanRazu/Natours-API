const nodemailer = require('nodemailer')
// const { options } = require('../router/tourRoutes')

const sendMail = options =>{
    // 1. Create a Transport
    const transporter = nodemailer.createTransport({ 
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            password: process.env.EMAILPASSWORD
        }
    });
   // 2. Define the mail option
    

}