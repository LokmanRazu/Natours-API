const appError = require('../utils/error');

exports.protect = async (req,res,next)=>{
try{
        // Getting Token and check of its there
        let token ;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        }
        console.log(`I am token:- ${token}`)
        if(!token){
            return next(new appError('you are not logged in!',401));
        }
        res.status(200).json({
            status:'sucess',
            data:{
                token
            }
        })
    
}catch(e){
    console.log(`I am from Protech Middleware: ${e}`);
        next(e)
}
}