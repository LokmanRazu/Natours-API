const appError = require('../utils/error');
const User = require('../model/userModel')
const { promisify } = require('util')
const jwt = require('jsonwebtoken');

exports.protect = async (req,res,next)=>{
try{
        // Getting Token and check of its there
        let token ;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        }
        if(!token){
            return next(new appError('you are not logged in!',401));
        };

        // Verify the Token
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // Check if user still exist
        const freshUser = await User.findById(decode.id);
        if(!freshUser){
            return next(new appError('User does not exist,login again',401));
        };

        // Check is user changed password after the token was issued
        if(freshUser.changedPasswordAfter(decode.iat)){
            return next(new appError('User recently changed password, please login again',401));
        }

        req.user  = freshUser;
        next();
    
}catch(e){
    console.log(`I am from Protect Middleware: ${e}`);
        next(e);
}
}