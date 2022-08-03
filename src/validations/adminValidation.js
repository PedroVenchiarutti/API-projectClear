const yup = require('yup');

const adminSchema = yup.object().shape({

  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(5),

});

module.exports = adminSchema;
