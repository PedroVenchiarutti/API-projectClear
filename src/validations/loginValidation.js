const yup = require("yup");

const loginSchema = yup.object({
  
  email: yup.strig().email().required(),
  password: yup.string().required().min(6)

});

module.exports - loginSchema;
