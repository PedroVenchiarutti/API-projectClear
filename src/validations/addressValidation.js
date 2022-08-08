const yup = require('yup');

const addressSchema = yup.object().shape({
  
  cep: yup.number().required().integer().positive(),
  address: yup.string().required(),
  district: yup.string().required(),
  city:yup.string().required(),
  complement:yup.string().notRequired(),
  user_id:yup.number().required().integer().positive()
});

module.exports = addressSchema;
