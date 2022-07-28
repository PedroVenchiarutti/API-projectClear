const yup = require('yup');

const clientSchema = yup.object({

    name: yup.string().required(),
    password: yup.string().required().min(6),
    email: yup.string().email().required(),
    cpf: yup.number().required(),
    phone: yup.number().nullable().notRequired(),
    sexo: yup.string().nullable(),
    //birth: yup.date().nullable(),
    img_url: yup.string().url().notRequired()
})

module.exports = clientSchema;