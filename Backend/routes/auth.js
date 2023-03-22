const router = require('express').Router();
const User = require('../models/auth');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {

    try {
        const { username, email, password } = req.body;

        const securedPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: securedPass,
        });

        const saveUser = await newUser.save();
        res.status(200).json(saveUser);

    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/login', async (req, res) => {

    try {

        const { email } = req.body;

        const login = User.find({ email });

        if (login) {
            res.status(200).json("Logged In");    
        } else {
            res.status(400).json("Bad");    

        }


    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;