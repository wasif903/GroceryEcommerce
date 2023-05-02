const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        title: { type: String, required: true },
        shortDesc: { type: String, required: true },
        longDesc: { type: String, required: true },
        price: { type: Number, required: true },
        featured_image: { type: String },
        gallery_images: [{ type: String }],
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
        userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        storeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subCategory' },

    },
    { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);