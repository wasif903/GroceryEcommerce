// category.js
const Category = require('../models/category');
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create-category', authMiddleware(['Manager', 'Employee']), async (req, res) => {
  try {
    const createCategory = await new Category(req.body);
    const saveCategory = await createCategory.save();
    res.status(201).json(saveCategory);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;