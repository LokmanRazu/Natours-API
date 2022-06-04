const User = require('./../model/userModel')
const jwt = require('jsonwebtoken');
const appError = require('../utils/error');

exports.signup = async (req, res, next)=>{
  let {name,email,password,passwordConfirm} = req.body
    try{  
        let user = new User({
          name,email,password,passwordConfirm
        })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ,{ expiresIn:process.env.JWT_EXPIRES_IN });
        await user.save()
        res.status(201).json({
          status:"success",
          jwtToken:{
            token
          },
          data:{
            user
          }
        })
 
    }catch(e){
             console.log(`I am from signup Controller: ${e}`);
        next(e)
  }
};

exports.login = (req,res,next)=>{
  const { email, password } = req.body
  if(!email || !password){
    return next(new appError('Incorrect email or password', 401))
  };
  try{

  }catch(e){
    console.log(`I am from login-controller : ${e}`)
    next(e)
  }
} 