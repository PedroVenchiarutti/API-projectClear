const yup = require('yup');

const procedureValidation = yup.object().shape({

  name: yup.string().required(),
  value: yup.number().required().positive(),
  categorie: yup.string().required()
});

module.exports = procedureValidation;
