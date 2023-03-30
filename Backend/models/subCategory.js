const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubCategorySchema = new Schema({

    subCategory: {
        type: String,
        unique:true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    }

});

const SubCategory = mongoose.model('subCategory', SubCategorySchema);

module.exports = SubCategory;