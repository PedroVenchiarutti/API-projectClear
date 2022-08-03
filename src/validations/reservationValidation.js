const yup = require('yup')
const procedureValidation = require('../validations/procedureValidation.js');

const reservationValidation = yup.object().shape({
  date: yup.date().required(),
  user_id: yup.number().required().integer(),
  procedures: yup.array().of(
      yup.number().integer().required()
    ),
  })

module.exports = reservationValidation;
