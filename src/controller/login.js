const loginRepository = require('../repositories/loginRepository.js');
const apiError = require("../error/apiError.js");
const jwt = require("jsonwebtoken");

// gerando token
function tokenGem(id,adm) {
  console.log(adm)
  const token = jwt.sign({
    id,
    "adm":adm
  }, process.env.SECRET, {
    // expira em 3h
    expiresIn: 10800
  })

  return token;
}

exports.login = async (req, res, next) => {

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

        const token = tokenGem(account.info.id,account.adm);
        
        console.log(account.adm)
        
        res.json({
          token,
          "account":account.info
        })
      }, (e) => {
        next(apiError.badRequest(e.message))
      })

  } catch (e) {
    next(apiError.badRequest(e.message))
  }
}
