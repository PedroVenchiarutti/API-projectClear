const yup = require("yup");

const loginSchema = yup.object().shape({
  
  email: yup.string().required().email(),
  password: yup.string().required().min(6)
  
});

module.exports = loginSchema;
