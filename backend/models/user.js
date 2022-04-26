const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    username:{
        type:String,
        required:[true,'Username cannot be blank']
    },
    password:{
        type: String,
        select:false,
        required:[true,'Password cannot be blank']
    },
    phoneNumber:{
        type: Number,
        reuiqred:[true,'Password cannot be blank']
    },
    email:{
        type:String,
        unique: true,
        required:[true,'Email cannot be blank']
    },
    verified: {
        type: Boolean,
        default:false
    },
    isClubPresident: {
        type: Boolean,
        default:false
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    verifyEmailToken:String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})


userSchema.pre('save', async  (next)=>{
    if (!this.isModified('password'))
        return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.getJWTToken = () => {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};





module.exports = mongoose.model('User',userSchema);