const jwt = require('jsonwebtoken')

const authMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const decodedToken = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET_KEY);

      const userRoles = decodedToken.roles;

      const allowed = userRoles.some(role => allowedRoles.includes(role));

      if (!allowed) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.userId = decodedToken.id;
      req.userRole = decodedToken.roles;

      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};

module.exports = authMiddleware;