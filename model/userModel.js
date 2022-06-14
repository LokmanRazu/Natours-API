const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto') // for random Token genarate

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
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date
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

// Forget Password
userSchema.methods.CreatePasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    console.log({resetToken},this.passwordResetToken)
    this.passwordResetExpires = Date.now() + 10 *10 *1000;

    return resetToken;
};

userSchema.pre('save', function(next){
    if(!this.isModified('password') || this.isNew) return next()

    this.passwordChangedAt = Date.now() - 1000 ;
})

const User = mongoose.model('User',userSchema);
module.exports = User;