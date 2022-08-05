const loginRepository = require('../repositories/loginRepository.js');
const apiError = require("../error/apiError.js");

exports.login = (req, res, next) => {
  /*
   * #swagger.tags = ['login','public']
      #swagger.summary="Login"
      #swagger.parameters['Login'] => {
        in:"body",
        description:"modelo de dados dos Procedimentos",
        schema:{
          $email:"caiodjesus1@gmail.com",
          $password:"caio123",
        }
    }

  * */
  const {
    email,
    password
  } = req.body;
  try {

    loginRepository(email, password)
      .then(account => {
        
        res.send(account)
      }, (e) => {
        console.log(e.message);
        next(apiError.badRequest(e.message))
      })

  } catch (e) {
    next(apiError.badRequest(e.message))
  }
}
