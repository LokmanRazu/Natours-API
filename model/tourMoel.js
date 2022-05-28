const mongoose = require('mongoose')
const { default: slugify } = require('slugify')
const slug = require('slugify')


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
},{
    toJSON: { virtuals:true }, toObject: { virtuals:true }      // For Virtuals Properties
})

// Mongoose Document Middleware: only exicute before .save() and .create()

// Virtual Properties
tourSchema.virtual('sinceWeeks').get( function(){
    return this.since/7
})

// Slugify for unique any properties
tourSchema.pre('save', function(next){
this.slug = slugify(this.name, { lower:true })
next()
})

const Tour = mongoose.model('Tour',tourSchema)
module.exports = Tour