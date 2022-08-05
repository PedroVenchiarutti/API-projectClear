const yup  = require('yup')

const idSchema = yup.number("Não é um numero").integer("Numero Quebrado").positive();

module.exports = idSchema;
