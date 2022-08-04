const yup = require('yup')

const requestSchema = yup.object().shape({

  user_id: yup.number().required().integer(),
  date: yup.date().required(),
  products: yup.array().of(
    yup.object().shape({
      id:yup.number().required().integer()
      qt:yup.number().required().integer()
    })
  )
});

module.exports = requestSchema;
