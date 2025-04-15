const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};



const checkRole = (role) => {
  return (req, res, next) => {
    if (req.userRole !== role && req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

module.exports = { verifyToken, checkRole };
