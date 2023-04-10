const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
  
    category: {
        type: String,
        default: "uncategorized",
        unique: true
    },

    storeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
