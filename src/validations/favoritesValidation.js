const yup = require("yup");

const favoritesValidation = yup.object().shape({

  user_id:yup.number().required().positive,
  product_id:yup.number().required().positive
});

module.exports = favoritesValidation;
