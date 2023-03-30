const mongoose = require('mongoose');
const { Schema } = mongoose;

const SuperAdminSchema = new Schema({

    adminUsername: {
        type: String,
        require: true,
        unique: true
    },

    adminEmail: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    },

    role: {
        type: ['Super Admin'],
        require: true,
        default: ['Super Admin']
    }

});

const SuperAdmin = mongoose.model('Super-Admin', SuperAdminSchema);

module.exports = SuperAdmin;