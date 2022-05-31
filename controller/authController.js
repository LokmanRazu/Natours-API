const User = require('./../model/userModel')

exports.signup = async (req, res, next)=>{
    try{  
        const newUser = await User.create(req.body)
        res.status(201).json({
          status:'sucess',
          data:{
              user: newUser
          }  
        })
    }catch(e){
             console.log(`I am from signup Controller: ${e}`)
        next(e)
  }
}