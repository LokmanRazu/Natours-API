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
        required:[true, 'Review must belong to a tour']
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

// Populate Data to the user
reviewSchema.pre(/^find/, function(next){
    this.populate({
        path:'tour',  // This 'tour' from tourModel Data
        select:'name'
    }).populate({   // If wamt to POPULATE Multiple Data
        path:'user',
        select:'name photo'
    });
    next()
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review; 