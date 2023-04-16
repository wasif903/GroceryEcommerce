const router = require('express').Router();
const Category = require('../models/category');
const subCategory = require('../models/subCategory');
const Product = require('../models/product');


router.post('/create-product', async (req, res) => {


    try {

        const findCategory =  Category.findOne({ category: req.body.categoryID });

        const findSubCat =  subCategory.findOne({ category: req.body.subCategoryID });


        if (!findCategory) {

            res.status(404).json("Category Not Found");

        } else if (!findSubCat) {

            res.status(404).json("Sub Category Not Found");

        } else {

            const createProduct = new Product({
                title: req.body.title,
                shortDesc: req.body.shortDesc,
                longDesc: req.body.longDesc,
                userId: req.body.userId,
                categoryID: findCategory._id,
                subCategoryID: findSubCat._id
            })

            console.log('before save')
            const saveProduct = createProduct.save();
            console.log('after save')

            res.status(200).json(saveProduct);
        }


    } catch (error) {

        res.status(200).json(error);

    }

})


module.exports = router; 
