const favoritesRepository = require("../repositories/favoritesRepository");
const ApiError = require("../error/apiError");

const TABLE_NAME = "favorites";

exports.add = (req, res, next) => {
  favoritesRepository.insertTable(TABLE_NAME, req.body).then(review => res.send(review))
    .catch(error => next(ApiError.badRequest(error.message)));
}

exports.getByUserId = (req, res, next) => {
  favoritesRepository.getByUserId(req.params.userId).then(review => res.send(review))
    .catch(error => next(ApiError.badRequest(error.message)));
}

exports.getByUserAndProductId = (req, res, next) => {
  const { userId, productId } = req.params;

  favoritesRepository.getByUserAndProductId(userId, productId).then(review => {
    res.send(review);
  }, error => {
    next(ApiError.badRequest(error));
  });
}

exports.delete = (req, res, next) => {
  favoritesRepository.deleteTable(TABLE_NAME, req.params.id)
    .then(() => res.status(200).send())
    .catch(error => next(ApiError.badRequest(error.message)));
}