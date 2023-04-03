const router = require('express').Router();
const StoreAuth = require('../../models/AuthModels/StoreAuth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register-store', async (req, res) => {

    try {
        const { storeName, phone, address, username, email, password, confirmPass, roles } = req.body;

        const securedPass = await bcrypt.hash(password, 10);

        const newStore = new StoreAuth({
            storeName,
            phone,
            address,
            username,
            email,
            roles,
            password: securedPass,
            confirmPass: securedPass
        });

        const saveStore = await newStore.save();
        res.status(200).json(saveStore);

    } catch (error) {
        res.status(500).json(error);
    }
});


router.post('/login-store', async (req, res) => {
    try {
        const { email, password, confirmPass } = req.body;

        const store = await StoreAuth.findOne({ email });

        if (!store) {
            return res.status(400).json({ error: 'Store not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, store.password);
        // const checkConfirmPass = await bcrypt.compare(confirmPass, isPasswordMatch)

        const token = jwt.sign({ id: store._id, email: store.email, roles: store.roles }, process.env.JWT_SECRET_KEY);


        if (!isPasswordMatch) {
            return res.status(400).json({ error: 'Wrong password' });
        } 
        // else if (!checkConfirmPass) {
        //     return res.status(400).json({ error: 'passwords are not same' });
        // } 
        else {
            res.status(200).json({ message: 'Logged In', token });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;