const User = require('./../model/userModel')
const jwt = require('jsonwebtoken');
const appError = require('../utils/error');
const bcrypt = require('bcrypt')

exports.signup = async (req, res, next)=>{
  let {name,email,password,passwordConfirm} = req.body
    try{  
        let user = new User({
          name,email,password,passwordConfirm
        })
        await user.save()
        res.status(201).json({
          status:"success",
          data:{
            user
          }
        })
 
    }catch(e){
             console.log(`I am from signup Controller: ${e}`);
        next(e)
  }
};

exports.login = async (req,res,next)=>{
  // Does user exist
  const { email, password } = req.body
  if(!email || !password){
    return next(new appError('Incorrect email or password', 401))
  };
  try{
    // Does user { email,password } exist in DB
    let user = await User.findOne({ email }).select('password')
    if(!user){
      return next(new appError('invalid email',401))
    }
    // Match the password
    let match =await bcrypt.compare(password, user.password)
    if(!match){
        return res.json({
            message:'Invalid Credential'
        })
      }
      // Genarate the JWT Token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET ,{ expiresIn:process.env.JWT_EXPIRES_IN });
      res.status(200).json({
        status:'sucess',
        data:{
          token
        }
      })
  }catch(e){
    console.log(`I am from login-controller : ${e}`);
    next(e)
  }
} 