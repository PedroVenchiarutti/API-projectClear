const yup = require('yup');

const discountSchema = yup.object().shape({

  discount: yup.number().required().positive().integer(),
  code: yup.string().required(),
  dt_limit: yup.date().nullable().notRequired()

});

module.exports = discountSchema;
