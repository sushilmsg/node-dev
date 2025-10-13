const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true, 
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'], // optional: restrict allowed values
  },
}, {
  timestamps: true, // adds createdAt and updatedAt automatically
});


userSchema.methods.getJWT= async function(){

 const user = this;
 const token = await jwt.sign({_id:user._id},"Dev@Nodejs@#!123",{expiresIn: "1d", });

 return token;

}

 userSchema.methods.validatePasword = async function(passwordInputByUser){

  const user = this;
  const passwordHash  = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser ,passwordHash);
  return isPasswordValid;

 }

 


module.exports = mongoose.model('User', userSchema);
