// backend/middleware/authenticate.js

const jwt = require('jsonwebtoken');
const User = require('../Model/user');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const user = await User.findById(decoded.userId);

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};

module.exports = authenticateJWT;
