const jwt = require('jwt');

const loginSchema = require('../validations/login');
const validate = require('../middlewares/validationMiddleware.js');

const login = validate(loginSchema),(req,res,next) =>{

  
  
}

module.exports = login;
