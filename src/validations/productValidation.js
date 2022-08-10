const yup = require('yup');

const productSchema = yup.object().shape({
  
  name: yup.string().required(),
  value: yup.number().required().positive(),
  description: yup.string().required(),
  qt: yup.number().positive().integer().required(),
  brand: yup.string().required()

});

module.exports = productSchema;
