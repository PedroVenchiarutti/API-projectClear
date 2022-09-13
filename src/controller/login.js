const loginRepository = require('../repositories/loginRepository.js');
const apiError = require("../error/apiError.js");
const jwt = require("jsonwebtoken");

const generateToken = (id) => jwt.sign({ id, isAdmin: false }, process.env.SECRET, { expiresIn: 10800 });

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  loginRepository(email, password).then(user => {
    res.send({ user, token: generateToken(user.id) })
  }).catch(error => {
    next(apiError.badRequest(error));
  });
}
