const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({

    title: {
        type: String,
        require: true
    },

    shortDesc: {
        type: String,
        require: true,
        unique: true
    },

    longDesc: {
        type: String,
        require: true
    },

    category:{
        categoryID: mongoose.Schema.Types.ObjectId,
        ref:"category"
    }, 
    
    subCategory:{
        categoryID: mongoose.Schema.Types.ObjectId,
        ref:"subCategory"
    }, 

});

const User = mongoose.model('User', UserSchema);

module.exports = User;