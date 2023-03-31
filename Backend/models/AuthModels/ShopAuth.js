const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShopSchema = new Schema({

    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    address: {
        type: String,
        require: true,
    },

    phone: {
        type: String,
        require: true,
    },

    password: {
        type: String,
        require: true
    },

    confirmPass: {
        type: String,
        require: true
    },

    roles: {
        type: [String],
        enum: ['Admin'],
        default: ["Admin"],
        require: true
    }

});

const Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;