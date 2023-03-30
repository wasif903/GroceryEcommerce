const subCategory = require('../models/subCategory');
const Category = require('../models/category');
const router = require('express').Router();
const AdminAuthMiddleware = require('../middlewares/ShopAdminAuth');


router.post('/create-subcategory', AdminAuthMiddleware, async (req, res) => {

    try {

        const findCategory = await Category.findOne({category:req.body.category});

        if (!findCategory) {
            res.status(404).json("Category Not Found");
        }

        const createSubCategory = await new subCategory({
            subCategory: req.body.subCategory,
            category: findCategory._id,
        });

        const saveSubCategory = await createSubCategory.save();

        res.status(201).json(saveSubCategory);

    } catch (error) {
        res.status(500).json("Internal Server Error");
        console.log(error)
    }

})


module.exports = router;