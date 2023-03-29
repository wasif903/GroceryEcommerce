const jwt = require('jsonwebtoken');

const ShopAdminAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json("Unauthorized");
        }

        const decodedToken = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);

        if (!decodedToken.roles.includes('Admin')) {
            return res.status(403).json("Forbidden");
        }

        req.userId = decodedToken.id;
        req.roles = decodedToken.roles;

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = ShopAdminAuth;
