const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchame = new Schema({

    category: {
        type: String,
        default: "uncategorized",
        unique:true
    },
    
    store: {
        storeID:mongoose.Schema.Types.ObjectId,
        ref:"Store"
    },

});

const Category = mongoose.model('category', CategorySchame);

module.exports = Category;