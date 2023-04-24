const mongoose = require('mongoose');
const { Schema } = mongoose;

const StoreSchema = new Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },

  storeName: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: Number,
    required: true
  },

  address: {
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

  storeImage: {
    type: String
  },

  roles: {
    type: [String],
    enum: ['Admin'],
    default: ['Admin'],
    required: true
  },

  storeStatus: {
    type: [String],
    enum: ['Blocked', 'Unblocked'],
    default: ['Unblocked'],
    required: true
  },

  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: false
  }

});

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;
