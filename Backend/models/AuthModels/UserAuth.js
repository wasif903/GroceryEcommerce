const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPass: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    enum: [ 'Admin' ,'Customer','Manager', 'Employee'],
    default: ["Customer"],
    required: true
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;