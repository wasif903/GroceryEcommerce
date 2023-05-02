const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubCategorySchema = new Schema({

    subCategory: {
        type: String,

    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },

    storeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store"
    },

    subCategoryImage: {
        type: String,
        require: true
    }

});

const SubCategory = mongoose.model('subCategory', SubCategorySchema);

module.exports = SubCategory;