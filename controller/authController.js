const User = require('./../model/userModel')
const jwt = require('jsonwebtoken')

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
}