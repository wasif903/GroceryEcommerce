const router = require('express').Router();
const User = require('../models/auth');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password, confirmPass } = req.body;

        const newUser = await new User({
            username,
            email,
            password,
            confirmPass
        });

        if (password === confirmPass) {

            const saveUser = await newUser.save();

            res.status(200).json(saveUser);

        } else {

            res.status(400).json("Password Doesn't Match Eachother");
        
        }

    } catch (error) {

        res.status(500).json(error);

    }
});

module.exports = router;
