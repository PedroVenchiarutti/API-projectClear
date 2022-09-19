const loginRepository = require('../repositories/loginRepository.js');
const apiError = require("../error/apiError.js");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {

  const expires = new Date(Date.now()+10800000);
  const generatedToken = jwt.sign({ id, isAdmin: false }, process.env.SECRET, { expiresIn: 10800 });
 
  return {generatedToken,expires};

}

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  loginRepository(email, password).then(user => {
    
    const token = generateToken(user.id)

    res.send({ user, token})
  
  }).catch(error => {
    next(apiError.badRequest(error.message));
  });
}