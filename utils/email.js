const nodemailer = require('nodemailer')
// const { options } = require('../router/tourRoutes')

const sendMail =async options =>{
    // 1. Create a Transport
    const transporter = nodemailer.createTransport({ 
        host:process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure:false,
        auth:{
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
   // 2. Define the mail option
    const mailOptions = {
        from: 'Lokman Hossain <lokmananil65@gmail.com>',
        to:options.email,
        subject:options.subject,
        text:options.message
        // html
    };

    // 3. Actully send the mail
    await transporter.sendMail(mailOptions);
};

module.exports = sendMail;