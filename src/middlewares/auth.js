const jwt = require('jsonwebtoken');
const apiError = require('../error/apiError.js');
require('dotenv/config');

const authMiddleware = () => (req, res, next) => {
  const token = req.headers['authorization'];

  if (token)
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      console.log(err);
      if (err) next(apiError.forbidden("acesso negado"))
      else {
        if (decoded.isAdmin) req.isAdmin = true;
        next();
      }
    }); else next(apiError.forbidden("acesso negado"));
}

module.exports = authMiddleware;
