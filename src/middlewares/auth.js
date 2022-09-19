const jwt = require("jsonwebtoken");
const apiError = require("../error/apiError.js");

const { config } = require("dotenv");
const ApiError = require("../error/apiError.js");
config();

const authMiddleware = () => (req, res, next) => {
  const token = req.headers["authorization"];

  if (token)
    jwt.verify(token, process.env.SECRET, (err, decoded) => {

      if (err) next(apiError.forbidden(err.message));

      else {

        req.authenticatedUserId = decoded.id;
        
        if (decoded.isAdmin) req.isAdmin = true;
        next();
      }
    });
  else next(apiError.forbidden("acesso negado"));
};

module.exports = authMiddleware;
