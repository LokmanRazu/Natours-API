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
};

exports.createReview = async (req,res,next)=>{
    try{
        // Allow Nasted Routes
        if(!req.body.tour) req.bady.tour = req.params.tourId ;
        if(!req.body.user) req.bady.user = req.user.id;
        const newRevirew = await Review.create(req.body)
        res.status(201).json({
            status:'success',
            result: newRevirew.length,
            data:{
                newRevirew
            }
        })


    }catch(e){
        console.log(`I am from CreateRivew Controller : ${e}`);
        next()
    }
}