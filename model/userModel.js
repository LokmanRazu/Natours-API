const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A tour must have a name'], //defule message
        trim:true,
        minlength:5,
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
    role:{
        type:String,
        enum:['user','guide','lead-guide','admin'],
        default:'user'
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
    },
    passwordChangedAt:Date
});

// Password HASHED using BCRYPT
userSchema.pre('save',async function(next){
    // only run when password are modified
    if(!this.isModified('password'))  // if not changed the Password
    return next();
    this.password = await bcrypt.hash(this.password,12);

    // Delete PasswordConfirm field
    this.passwordConfirm = undefined;
    next();
});

// Check is user changed password after the token was issued (main Method)
userSchema.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);
        return JWTTimestamp<changedTimestamp;
    };

    // false means not changed password
    return false;
};

const User = mongoose.model('User',userSchema);
module.exports = User;