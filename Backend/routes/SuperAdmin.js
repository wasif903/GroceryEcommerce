const router = require('express').Router();
const Admin = require('../models/SuperAdmin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {

    req.body.password = "superadmin123";
    const securedPass = await bcrypt.hash(req.body.password, 10);;


    const admin = await new Admin({
        adminUsername: "Super Admin",
        adminEmail: "superadmin@gmail.com",
        password: securedPass,
        role: "Super Admin"
    })


    const saveAdmin = admin.save();

    res.status(201).json(saveAdmin)

})


router.post('/login', async (req, res) => {
    try {
        const { adminUsername, adminEmail, password } = req.body;

        const admin = await Admin.findOne({ adminUsername, adminEmail });

        if (!admin) {
            return res.status(404).json({ error: 'Admin Account not found' });
        }

        const isPasswordMatch = await bcrypt.compare(password, admin.password);


        const token = jwt.sign({ id: admin._id, email: admin.email, role: admin.role }, process.env.JWT_SECRET_KEY);


        if (!isPasswordMatch) {
            return res.status(400).json({ error: 'Wrong password' });
        } else {
            res.status(200).json({ message: 'Super Admin Logged In', token });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router