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
    required:true,
    unique:true
  },
  
  phone: {
    type: Number,
    required:true,
  },
  
  address: {
    type: String,
    required:true,
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
    enum: ['Admin',  'Manager', 'Employee', 'Super Admin'],
    default: ["Admin"],
    required: true
  }
});

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;