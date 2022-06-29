const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:[true, 'Review can not be empty']
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    tour:{
        type:mongoose.Schema.ObjectId,
        ref:'Tour',
        required:[tour, 'Review must belomg to a tour']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true, 'review must belong wuth user']
    }
},
    {
        toJSON:{ virtuals:true },
        toObject:{ virtuals:true }
    }

);

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review;