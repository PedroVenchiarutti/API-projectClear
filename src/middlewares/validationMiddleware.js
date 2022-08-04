const apiError = require('../error/apiError.js');

const bodyValidation = (schema) => async (req, res, next) => {

  const body = req.body;

  try {

    await schema.validate(body);

    req.body = body;

    next();

  } catch (error) {

    return next(apiError.notAcceptable(error.message));
  }
}

module.exports = bodyValidation
