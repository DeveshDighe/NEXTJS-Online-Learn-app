const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  email : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
  role : {
    type : String,
    default : "USER"
  },
  lectures: [{
    type: mongoose.Schema.Types.ObjectId, // Reference to the lecture model
    ref: 'lectures' // Name of the related model
  }],
  createdAt : {
    type : Date,
    default : Date.now()
  }
})


const User = mongoose.models?.users || mongoose.model('users', UserSchema)
module.exports = User;