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
        unique: false
    },

    longDesc: {
        type: String,
        require: true
    },

    storeID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Store"
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

module.exports =  mongoose.model('product', ProductSchema);
