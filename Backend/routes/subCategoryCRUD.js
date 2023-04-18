const subCategory = require('../models/subCategory');
const Category = require('../models/category');
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const SubCategory = require('../models/subCategory');
const path = require('path');
const upload = require('../utils/multerConfig');

router.post('/create-subcategory', upload.single('subCategoryImage'), authMiddleware(['Admin', 'Manager', 'Employee']), async (req, res) => {

    try {

        const findCategory = await Category.findOne({ category: req.body.category });

        const subCategoryImage = req.file.path;

        if (!findCategory) {
            res.status(404).json("Category Not Found");
        }

        const createSubCategory = new subCategory({
            subCategory: req.body.subCategory,
            category: findCategory._id,
            storeID: req.body.storeID,
            subCategoryImage: subCategoryImage
        });

        const saveSubCategory = await createSubCategory.save();

        res.status(201).json(saveSubCategory);

    } catch (error) {
        res.status(500).json("Internal Server Error");
        console.log(error)
    }

})



router.patch('/update-subcategory/:id', authMiddleware(['Admin', 'Manager', 'Employee']), upload.single('subCategoryImage'), async (req, res) => {
    try {
        const { id } = req.params;
        const findCategory = await Category.findOne({ category: req.body.category });
        if (!findCategory) {
            return res.status(404).json("Category Not Found");
        }
        const subCategoryToUpdate = await SubCategory.findById(id);
        if (!subCategoryToUpdate) {
            return res.status(404).json("Subcategory Not Found");
        }
        subCategoryToUpdate.subCategory = req.file.subCategory || subCategoryToUpdate.subCategory;
        if (req.file) {
            subCategoryToUpdate.subCategoryImage = req.file.path;
        }
        subCategoryToUpdate.category = findCategory._id;
        const updatedSubCategory = await subCategoryToUpdate.save();
        res.status(200).json(updatedSubCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
});


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