const Review = require('./../model/reviewModel')

exports.getAllReview = async (req,res,next)=>{
    try{

    }catch(e){
        console.log(`I am from getAllReview Controller : ${e}`);
        next()
    }
}