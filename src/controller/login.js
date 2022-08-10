const loginRepository = require('../repositories/loginRepository.js');
const apiError = require("../error/apiError.js");
const jwt = require("jsonwebtoken");
const crypto = require("../config/bcrypt.js");

// gerando token
function tokenGem(id){
                  
  const token = jwt.sign({id},process.env.SECRET,{
    // expira em 3h
    expiresIn:10800})

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
    
        const token = tokenGem(account.id);
        
        // bcrypt compare
        
        res.json({
          token,
          account
        })
      }, (e) => {
        next(apiError.badRequest(e.message))
      })

  } catch (e) {
    next(apiError.badRequest(e.message))
  }
}
