const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchame = new Schema({

    category: {
        type: String,
        default: "uncategorized",
        unique:true
    },

});

const Category = mongoose.model('category', CategorySchame);

module.exports = Category;