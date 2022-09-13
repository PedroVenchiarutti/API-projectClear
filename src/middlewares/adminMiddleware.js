const apiError = require('../error/apiError.js');

const { config } = require("dotenv");
config();

const adminMiddleware = () => (req, res, next) => {
    if (req.isAdmin) next();
    else next(apiError.forbidden("acesso negado"));
}

module.exports = adminMiddleware;