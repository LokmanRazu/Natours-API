const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A tour must have a name'], //defule message
        trim:true,
        minlength:10,
        maxlength:20
    },
    slug:String,
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    photo:{
        type:String,
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    passwordConfirm:{
        type:String,
        required:true,
        validate:{
            validator:function(el){
                // This only work on CREATE and SAVE
                return el === this.password
            }
        },
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User