const yup  = require('yup')

const idSchema = yup.object({
    id: yup.number("Não é um numero").required("id necessario").integer("Numero Quebrado")
});

module.exports = idSchema;
