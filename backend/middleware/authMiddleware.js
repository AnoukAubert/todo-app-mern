// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// eslint-disable-next-line consistent-return
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization') ? req.header('Authorization').split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
