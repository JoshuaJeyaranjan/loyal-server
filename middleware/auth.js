// Example of isAdmin middleware
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db'); // Adjust this according to your setup

function isAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, 'your-secret-key', async (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    
    const user = await getUserById(decoded.userId); // Implement getUserById
    if (user && user.isAdmin) {
      req.user = user;
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  });
}

module.exports = { isAdmin };
