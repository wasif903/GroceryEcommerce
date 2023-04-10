const router = require('express').Router();
const Category = require('../models/category');
const Product = require('../models/product');
const SubCategory = require('../models/subCategory');
const Store = require('../models/AuthModels/StoreAuth');

router.post('/create-product/:storeID', async (req, res) => {

    try {
        const { storeID } = req.params;
        const findCategory = await Category.findOne({ category: req.body.category });
        const findSubCategory = await SubCategory.findOne({ subCategory: req.body.subCategory });
        const store = Store.findById(storeID);

        if (!findCategory) {
            res.status(404).json({ message: "Category Not Found" });

        } else if (!findSubCategory) {
            res.status(404).json({ message: "Sub Category Not Found" });

        } else if (!store) {
            res.status(404).json({ message: "Store Not Found" });
        } else {

            const product = await new Product({
                title: req.body.title,
                shortDesc: req.body.shortDesc,
                longDesc: req.body.longDesc,
                storeID: storeID,
                categoryID: findCategory._id,
                subCategoryID: findSubCategory._id,
            });

            const saveProduct = await product.save();
            res.status(200).json({ message: "Product Created", saveProduct });
        }

    } catch (error) {

        res.status(500).json({ message: "Error Creating Product", error })

    }
})

module.exports = router;
