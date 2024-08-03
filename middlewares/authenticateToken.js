const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
  
    if (token == null) return res.sendStatus(401); // No token provided
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Please Login." });; // Token invalid or expired
      //req.user = user; // Attach user data to the request object
      next(); // Continue to the next middleware or route handler
    });
  };
  
  module.exports = authenticateToken;