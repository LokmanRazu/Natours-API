const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
        }
    }
})

// Password HASHED using BCRYPT
userSchema.pre('save',async function(next){
    // only run when password are modified
    if(!this.isModified('password'))  // if not changed the Password
    return next()
    this.password = await bcrypt.hash(this.password,12)

    // Delete PasswordConfirm field
    this.passwordConfirm = undefined;
    next()
})

const User = mongoose.model('User',userSchema);
module.exports = User;