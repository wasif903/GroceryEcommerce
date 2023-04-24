const router = require('express').Router();
const StoreAuth = require('../../models/AuthModels/StoreAuth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const upload = require('../../utils/multerConfig');

router.post('/register-store', upload.single('storeImage'), async (req, res) => {

    try {
        const { storeName, phone, address, username, email, password, confirmPass, roles } = req.body;

        const storeImage = req.file.path;

        const securedPass = await bcrypt.hash(password, 10);

        const newStore = new StoreAuth({
            storeName,
            phone,
            address,
            username,
            email,
            roles,
            password: securedPass,
            confirmPass: securedPass,
            storeImage: storeImage
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

        const token = jwt.sign({ id: store._id, email: store.email, roles: store.roles }, process.env.JWT_SECRET_KEY);


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