const router = require('express').Router();
const User = require('../../models/AuthModels/UserAuth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    try {
        const { username, email, password, roles, confirmPass } = req.body;

        const securedPass = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            roles,
            confirmPass,
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
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);


        const token = jwt.sign({ id: user._id, email: user.email, roles: user.roles }, process.env.JWT_SECRET_KEY);


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