const jwt = require('jsonwebtoken');
const apiError = require('../error/apiError.js');
require('dotenv/config');

const authMiddleware = (permision = false ) => (req, res, next) => {
  
  
  const token = req.headers['authorization'];

  if (!token) {
    next(apiError.forbidden("acesso negado"))
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {

    if (err) {

      next(apiError.forbidden("acesso negado"))

    // access to all routes for the admToken
    } else if(decoded.adm == permision || decoded.adm == true) {
      //req.decoded = decoded
      next();
    }
    else{

      next(apiError.forbidden("Voce não tem a Permisão necessaria"))
    }
  })
}

module.exports = authMiddleware;
