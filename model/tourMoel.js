const mongoose = require('mongoose')


const tourSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true 
    },
    ceo:{
        type:String,
        required:true,
    },
    owner:{
        type:String,
        required:true,
    },
    netWorth:{
        type:String,
        default:123
    },
    since:{
        type:Number,
        required:true,
    },
    headquarter:{
        type:String,
        required:true
    }
})
const Tour = mongoose.model('Tour',tourSchema)
module.exports = Tour