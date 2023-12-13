var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String
  },
  password: String,
  image:String,
  isAdmin:{
    type:Boolean,
    default:false
  }
},
  { timestamps: true });

const Usermodule = mongoose.model('User', UserSchema);

module.exports = Usermodule;