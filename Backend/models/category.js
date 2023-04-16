const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({

    category: {
        type: String,
        default: "uncategorized",
    },

    storeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    },
    categoryImage: {
        type: String,
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
