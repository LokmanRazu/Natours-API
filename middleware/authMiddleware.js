const appError = require('../utils/error');
const User = require('../model/userModel')
const { promisify } = require('util')
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/email');
const crypto = require('crypto')


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
        // 1.get user based on POSTed Email
        const user = await User.findOne({ email:req.body.email })
        if(!user){
            return next(new appError('There is no user with Email Address',404));
        };
         // 2.Generate the random reset token
         const resetToken = user.CreatePasswordResetToken()
         await user.save({ validateBeforeSave:false })

        //  3.Send it to user Email
         const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
         const message = `forgot Your Password? submit a patch request with your new pasword: ${resetURL}.
         If you did not forget your password,Please Ignore thios email`;

         try{
            await sendMail ({ email:user.email, subject:'Your password reset Token', message });
            res.status(200).json({
               status:'success',
               message:'Token sent to email'
            })
         }catch(e){
            // user.PasswordResetToken = undefined
            // user.passwordResetExpires = undefined
            // await user.save({validateBeforeSave:false})
            return next(e);
         }
    }catch(e){
        console.log(`I am from forgot password middleware${e}`);
        next(e);
    }
}


// Reset password
exports.resetPassword =async (req,res,next)=>{
    try{
    // 1.Get user based on Token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    console.log('hashedToken: ',hashedToken)
    const user = await User.findOne({PasswordResetToken:hashedToken,passwordResetExpires:{ $gt: Date.now() }});
    console.log('user :',user)

    // 2.If token has not expired, and there is user,set the new password
    if(!user){
        return next(new appError('Token is invalid or has expired',400))
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    const newUser = await user.save();
    console.log('newuser :',newUser)
    // 3. Update ChangedPasswordAt property for the user

    // 4. Log the user in, sent JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ,{ expiresIn:process.env.JWT_EXPIRES_IN });
    console.log('token: ',token)
    res.status(200).json({
        status:'sucsess',
        data:{
            token
        }
    })

    }catch(e){
        console.log(`I am from Reset Pasword Middleware ${e}`)
        next(e);
    }
};
