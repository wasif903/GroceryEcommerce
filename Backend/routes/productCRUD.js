const router = require('express').Router();
const Category = require('../models/category');
const Product = require('../models/product');
const SubCategory = require('../models/subCategory');


router.post('/create-product', async (req, res) => {

    try {

        const findCategory = Category.findOne({category});
        const findSubCategory = SubCategory.find({subCategory})

        if (!findCategory || !findSubCategory) {
            res.status(404).json({ message: "Category Not Found" });
        }

        const product = await new Product(req.body);
        const saveProduct = await product.save();
        res.status(200).json({ message: "Product Created", saveProduct });

    } catch (error) {
    
        res.status(500).json({ message: "Error Creating Product", error })
    
    }
})

module.exports = router;