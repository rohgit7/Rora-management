const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and protect routes
function authenticateToken(req, res, next) {
  // Tokens are typically sent in the Authorization header as: Bearer <token>
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET || 'dev_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });

    // Attach user info to request object for downstream handlers
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
