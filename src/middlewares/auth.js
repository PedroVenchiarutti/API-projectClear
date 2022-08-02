const jwt = require('jsonerbtoken');
const apiError = require('../error/apiError.js');

module.exports = (req, res, next) => {

  if (req.method === 'OPTIONS') {

    next();

  } else {

    const token = req.body.token || req.query.token || req.headers['authorization'];

    if (!token) {

      next(apiError.forbidden("acesso negado"))
    }

    jwt.verify(token, env, (err, decoded) => {

      if (err) {

        next(apiError.forbidden("acesso negado"))
      
      } else {
        
        //req.decoded = decoded
        next();
      }
    })
  }
}
