const jwt = require('jsonwebtoken');
const apiError = require('../error/apiError.js');
require('dotenv/config');

const adminMiddleware = () => (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) next(apiError.forbidden("acesso negado"));
        if (decoded.isAdmin) next();
        else next(apiError.forbidden("acesso negado"));
    });
    else next(apiError.forbidden("acesso negado"));
}

module.exports = adminMiddleware;
