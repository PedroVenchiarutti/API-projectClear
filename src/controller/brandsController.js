const ApiError = require("../error/apiError");
const ProductRepository = require("../repositories/productRepository");

module.exports.getAll = (req, res, next) => {
    try {
        ProductRepository.getBrands()
            .then(results => res.send(results))
            .catch(error => next(ApiError.badRequest(error.message)));
    } catch (error) { next(ApiError.internalError(error.message)) }
}