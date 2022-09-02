const yup = require('yup');

const reviewSchema = yup.object().shape({

  product_id: yup.number().required().integer().positive(),
  user_id: yup.number().required().integer().positive(),
  stars: yup.number().required().integer().positive().max(5).min(0)
});

module.exports = reviewSchema;
