const loginRepository = require('../repositories/loginRepository.js');
const apiError = require("../error/apiError.js");
const jwt = require("jsonwebtoken");

function tokenGem(id) {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: 10800 });
}

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  loginRepository(email, password).then(user => {
    res.send({ user, token: tokenGem(user.id) })
  }).catch(error => {
    next(apiError.badRequest(error));
  });
}
