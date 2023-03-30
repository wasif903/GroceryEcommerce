const Category = require('../models/category');
const router = require('express').Router();
const AdminAuthMiddleware = require('../middlewares/ShopAdminAuth');
const ShopManagerAuth = require('../middlewares/ShopManagerAuth');
const ShopEmployeeAuth = require('../middlewares/ShopEmployeeAuth')

router.post('/create-category', [AdminAuthMiddleware, ShopManagerAuth, ShopEmployeeAuth], async (req, res) => {

    try {

        const createCategory = await new Category(req.body);

        const saveCategory = await createCategory.save();

        res.status(201).json(saveCategory);

    } catch (error) {
        res.status(500).json("Internal Server Error");
    }

})


module.exports = router;