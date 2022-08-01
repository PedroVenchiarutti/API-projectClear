const idSchema = require('../validations/idValidation.js');
const apiError = require('../error/apiError.js')
const client = require('../controller/clientController.js')


const idValidation = () => async (req, res, next) => {

  const id = req.params.id;

  try {

    await idSchema.validate(id);
    req.params.id = id;
    next(client.getById);

  } catch (e) {

    next(apiError.notAcceptable("id Invalido"))
  }
}


module.exports = idValidation;
