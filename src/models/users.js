const mongoose = require('mongoose');

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

module.exports = mongoose.model('User', userSchema);
