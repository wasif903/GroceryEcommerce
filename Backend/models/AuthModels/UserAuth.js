const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({

    username: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true
    },

    confirmPass: {
        type: String,
        require: true
    }

});

const User = mongoose.model('User', UserSchema);

module.exports = User;