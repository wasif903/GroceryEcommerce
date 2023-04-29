const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = new Schema(
    {
        title: { type: String, required: true },
        shortDesc: { type: String, required: true },
        longDesc: { type: String, required: true },
        price: { type: Number, required: true },
        featured_image: { type: String },
        gallery_images: [{ type: String }],
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },

    });

module.exports = mongoose.model("Property", PropertySchema);