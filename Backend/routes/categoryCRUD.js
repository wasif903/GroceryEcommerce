// category.js
const Category = require('../models/category');
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../utils/multerConfig');
const path = require('path');

router.post('/create-category', upload.single('categoryImage'), authMiddleware(['Admin', 'Manager', 'Employee']), async (req, res) => {
  try {

    const categoryImage = req.file;

    const createCategory = new Category({
      category: req.body.category,
      storeID: req.body.storeID,
      categoryImage: categoryImage.path
    });
    const saveCategory = await createCategory.save();
    res.status(201).json(saveCategory);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.log(error)
  }
});


router.patch('/update-category/:id', authMiddleware(['Admin', 'Manager', 'Employee']), async (req, res) => {

  try {

    const { id } = req.params;
    const getCat = await Category.findById(id);

    getCat.category = req.body.category || getCat.category

    const updatedCat = await getCat.save();

    res.status(200).json(updatedCat);

  } catch (error) {

    res.status(500).json("Interval Server Error");
  }

})


router.delete('/delete-category/:id', authMiddleware(['Admin', 'Manager', 'Employee']), async (req, res) => {

  try {

    const { id } = req.params;
    const getCat = await Category.findByIdAndDelete(id);

    res.status(200).json(getCat);

  } catch (error) {

    res.status(500).json("Interval Server Error");
  }

})



module.exports = router;