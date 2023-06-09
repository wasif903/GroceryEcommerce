const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({

  username: {
    type: String,
    required: true,
    unique: true
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
    enum: ['Manager', 'Employee', 'Super Admin', 'Customer'],
    default: ['Customer'],
    required: true
  },
  status: {
    type: [String],
    enum: ['Blocked', 'Unblocked'],
    default: ['Unblocked'],
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;