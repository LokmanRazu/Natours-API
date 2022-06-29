const Review = require('./../model/reviewModel')

exports.getAllReview = async (req,res,next)=>{
    try{
        const reviews = await Review.find();
        res.status(200).json({
            status:'success',
            result: reviews.length,
            data:{
                reviews
            }
        })

    }catch(e){
        console.log(`I am from getAllReview Controller : ${e}`);
        next()
    }
}