const idSchema = require('../validations/idValidation.js');
const apiError = require('../error/apiError.js')

const idValidation = () => async (req, res, next) => {

  const id = req.params.id;

  try {

    await idSchema.validate(id);
    req.params.id = id;

    next();

  } catch (e) {

    next(apiError.notAcceptable("id Invalido"))
  }
}


module.exports = idValidation;
