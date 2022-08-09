const loginRepository = require('../repositories/loginRepository.js');
const apiError = require("../error/apiError.js");
const jwt = require("jsonwebtoken");


// gerando token
function tokenGem(id){
                  
  const token = jwt.sign({id},process.env.SECRET,{
    // expira em 3h
    expiresIn:10800})

  return token;
}

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
    console.log(email); 
  try {

    console.log(email,password)
    loginRepository(email, password)
      .then(account => {
    
        const token = tokenGem(account.id);
        
        // bcrypt compare
        
        res.json({
          token,
          account
        })
      }, (e) => {
        console.log(e.message);
        next(apiError.badRequest(e.message))
      })

  } catch (e) {
    next(apiError.badRequest(e.message))
  }
}
