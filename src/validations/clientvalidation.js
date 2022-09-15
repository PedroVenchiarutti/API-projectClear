const yup = require("yup");

const clientSchema = yup.object().shape({
  username: yup.string().required(),
  name: yup.string().required(),
  password: yup.string().required().min(6),
  email: yup.string().email().required(),
  cpf: yup.number().required(),
  phone: yup.number().positive().nullable().notRequired(),
  sexo: yup.string().nullable(),
  birth: yup.date().notRequired(),
  img_url: yup.string().url().notRequired(),
});

module.exports = clientSchema;
