const yup = require('../validations/buysValidation.js');

const buysSchema = yup.schema().object().shape({
  request_id: yup.number().required().positive(),
  value: yup.number().required().positive()
});

module.exports = buysSchema;
