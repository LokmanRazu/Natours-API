const mongoose = require('mongoose')
const { default: slugify } = require('slugify')
const slug = require('slugify')
const User = require('./userModel')


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
    },
    startLocation:{
        // GeoJSON
        type:String,
        default:'point',
        enum:['point']
    },
    location:[
        {
            type:{
                type:String,
                default:'point',
                enum:['point']
            },
            coordinates:[Number],
            address:String,
            description:String, 
            day:Number
        }
    ],
    guides: [
        {
          type:mongoose.Schema.ObjectId ,
          ref:'User' 
        }
    ]
 
},{
    toJSON: { virtuals:true }, toObject: { virtuals:true }      // For Virtuals Properties
})



// Virtual Properties
tourSchema.virtual('sinceWeeks').get( function(){
    return this.since/7
})

// Mongoose Document Middleware: only exicute before .save() and .create()
// Slugify for unique any properties
// tourSchema.pre('save', function(next){
// this.slug = slugify(this.name, { lower:true })
// next()
// });

// Guides  manegment
tourSchema.pre('save', async function(next){
    const guidesPromises = this.guides.map(async id =>await User.findById(id));
    this.guides = await Promise.all(guidesPromises)
    next()
})

const Tour = mongoose.model('Tour',tourSchema)
module.exports = Tour