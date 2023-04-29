const router = require('express').Router();
const Category = require('../models/category');
const Product = require('../models/product');
const SubCategory = require('../models/subCategory');
const Store = require('../models/AuthModels/StoreAuth');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../utils/multerConfig');




// Create a new property with an image and gallery images
router.post('/create-product', upload.fields([
    { name: 'featured_image', maxCount: 1 },
    { name: 'gallery_images', maxCount: 10 }
]), authMiddleware(['Admin', 'Manager', 'Employee']), async (req, res) => {
    try {
        const { title, shortDesc, longDesc, price } = req.body;
        const { featured_image, gallery_images } = req.files;


        const createProperty = new Product({
            title,
            shortDesc,
            longDesc,
            price,
            featured_image: featured_image[0].path,
            gallery_images: gallery_images.map(image => image.path),
        });

        const saveProperty = await createProperty.save();

        console.log(saveProperty)

        res.status(200).json(saveProperty);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        console.log(error)
    }
});

// router.post('/:storeID/create-product/', upload.array([

//     { name: 'featuredImage', maxCount: 1 },
//     { name: 'galleryImage', maxCount: 5 }

// ]), authMiddleware(['Admin', 'Manager', 'Employee']), async (req, res) => {

//     try {
//         const { storeID } = req.params;

//         const {featuredImage, galleryImage} = req.files;

//         const findCategory = await Category.findOne({ categoryID: req.body.category });
//         const findSubCategory = await SubCategory.findOne({ subCategoryID: req.body.subCategory });

//         const store = await Store.findById(storeID);

//         if (!findCategory) {
//             res.status(404).json({ message: "Category Not Found" });

//         } else if (!findSubCategory) {
//             res.status(404).json({ message: "Sub Category Not Found" });

//         } else if (!store) {
//             res.status(404).json({ message: "Store Not Found" });
//         } else {

//             const product = new Product({
//                 title: req.body.title,
//                 shortDesc: req.body.shortDesc,
//                 longDesc: req.body.longDesc,
//                 storeID: storeID,
//                 categoryID: findCategory._id,
//                 subCategoryID: findSubCategory._id,
//                 featuredImage: featuredImage[0].path,
//                 galleryImage: galleryImage.map(img => img.path)
//             });

//             const saveProduct = await product.save();
//             res.status(200).json({ message: "Product Created", saveProduct });
//         }

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({ message: "Error Creating Product", error })

//     }
// })

module.exports = router;
