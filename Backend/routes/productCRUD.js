const router = require('express').Router();
const Category = require('../models/category');
const Product = require('../models/product');
const SubCategory = require('../models/subCategory');
const Store = require('../models/AuthModels/StoreAuth');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../utils/multerConfig');
const User = require('../models/AuthModels/UserAuth');


// Create a new property with an image and gallery images
router.post('/create-product', upload.fields([
    { name: 'featured_image', maxCount: 1 },
    { name: 'gallery_images', maxCount: 10 }
]), authMiddleware(['Admin', 'Manager', 'Employee']), async (req, res) => {
    try {
        const { title, shortDesc, longDesc, price } = req.body;
        const { featured_image, gallery_images } = req.files;

        const findUser = await User.findOne({ userID: req.body.email });
        const findStore = await Store.findOne({ storeID: req.body.storeName });
        const findCat = await Category.findOne({ category: req.body.category });
        const findSubCat = await SubCategory.findOne({ subCategory: req.body.subCategory });

        if (!findUser) {
           return  res.status(404).json({ mesasge: "User Not Found" });
        }
        if (!findStore) {
           return  res.status(404).json({ mesasge: "Store Not Found" });
        }
        if (!findCat) {
           return  res.status(404).json({ mesasge: "Category Not Found" });
        }
        if (!findSubCat) {
           return  res.status(404).json({ mesasge: "Sub Category Not Found" });
        }

        const createProduct = new Product({
            title,
            userID: findUser,
            shortDesc,
            longDesc,
            price,
            storeID: findStore,
            category: findCat,
            subCategory: findSubCat,
            featured_image: featured_image[0].path,
            gallery_images: gallery_images.map(image => image.path),
        });

        const saveProduct = await createProduct.save();
        console.log(saveProduct)
        res.status(200).json(saveProduct);




    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error)
    }
});



module.exports = router;
