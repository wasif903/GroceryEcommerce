const subCategory = require('../models/subCategory');
const Category = require('../models/category');
const router = require('express').Router();
// const ShopAdminAuth = require('../middlewares/ShopAdminAuth');
const authMiddleware = require('../middlewares/authMiddleware');
const SubCategory = require('../models/subCategory');


router.post('/create-subcategory', authMiddleware(['Manager', 'Employee']), async (req, res) => {

    try {

        const findCategory = await Category.findOne({ category: req.body.category });

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


router.delete('/delete-subcategory/:id', authMiddleware(['Manager', 'Admin']), async (req, res) => {

    try {

        const { id } = req.params;
        const findSubCat = await SubCategory.findByIdAndDelete(id);
        res.status(200).json(findSubCat);

    } catch (error) {

        res.status(200).json(error);
        console.log(error);

    }

})


module.exports = router;