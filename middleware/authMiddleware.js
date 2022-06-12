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
        console.log(decode)

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
};


// For Role Managment
exports.restrictTo = (...roles)=>{
    // ...role = ['admin', 'guide']
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new appError('You do not have permissionm to this action',403));
        }
        next();

    };
};


// Forgot Password middleware
exports.forgotPassword = async (req,res,next)=>{
    try{
        // get user based on POSTed Email
        const user = await User.findOne({ email:req.body.email })
        if(!user){
            return next(new appError('There is no user with Email Address',404));
        };
         // Generate the random reset token
         const resetToken = user.CreatePasswordResetToken()
         await user.save({ validateBeforeSave:false })

    }catch(e){
        console.log(`I am from forgot password middleware${e}`);
        next(e);
    }
}