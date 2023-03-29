const router = require('express').Router();
const Shop = require('../models/ShopAuth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register-shop', async (req, res) => {

    try {
        const { name, email, password, address, phone, confirmPass, roles } = req.body;

        const securedPass = await bcrypt.hash(password, 10);

        const newShop = new Shop({
            name,
            email,
            phone,
            roles,
            address,
            password: securedPass,
            confirmPass
        });

        const saveShop = await newShop.save();
        res.status(200).json(saveShop);

    } catch (error) {
        res.status(500).json(error);
    }
});


router.post('/login-shop', async (req, res) => {
    try {
        const { email, password, roles } = req.body;

        const shop = await Shop.findOne({ email });

        if (!shop) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, shop.password);


        const token = jwt.sign({ id: shop._id, email: shop.email, roles: shop.roles }, process.env.JWT_SECRET_KEY);


        if (!isPasswordMatch) {
            return res.status(400).json({ error: 'Wrong password' });
        } else {
            res.status(200).json({ message: 'Logged In', token });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;