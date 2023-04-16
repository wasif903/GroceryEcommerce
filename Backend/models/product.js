const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({

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

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },

    subCategoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory"
    },

});

const User = mongoose.model('Products', ProductSchema);

module.exports = User;