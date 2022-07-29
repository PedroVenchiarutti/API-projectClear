const validate = require('../middlewares/validationMiddleware.js');
const admSchema = require('../validations/adminValidation.js');
const idSchema = require('../validations/idValidation.js');
const genericQuerys = require('../repositories/genericQuerys.js');

exports.getAll = (req, res) => {
  /* 
    #swagger.tags = ['admin']
    #swagger.summary = 'Busca todos os administradores cadastrados no banco de dados'
  */

  genericQuerys.select("users")
    .then(adms => {
      res.send(adms)
    })
    .catch(err => {
      res.status(400).send(err);
    })
}

exports.getByid = async (req, res) => {

  try {

    const id = req.params.id;

    await idSchema.validate(id);

    genericQuerys.select('users', id)
      .then(adm => {
        res.send(adm)
      })
      .catch(err => {
        res.status(500).send(err)
      })

  } catch (err) {

    res.status(400).send(err)
  }
}

exports.add = validate(admSchema), (req, res) => {
  /*
    #swagger.tags = ['admin']
    #swagger.summary = 'Efetua a criação do admin no banco de dados.'
    #swagger.parameters['admin']=>{
      in: 'body',
      description: "Modelo de Admin",
      schema:{
        $name:"Oliver o Adm",
        $email:"oliver@gmail.com",
        $password:"auau123",
      }
    } 
    */

  try {

    const adm = req.body;

    genericQuerys.insertTable("adms", adm)
      .then(response => {
        res.send();
      })
      .catch(err => {
        res.status(500).send(err)
      });
  } catch (e) {

    res.status(500).send(err)
  }
}

exports.update = validate(admSchema), (req, res) => {
  /*
  #swagger.tags = ['admin']
  #swagger.summary = 'Efetua a alteraçao das informaões do admin.'
  #swagger.parameters['admin']=>{
    in: 'body',
    description: "Modelo de admin",
    schema:{
      $id:12,
      $name:"Oliver o adm",
      $email:"oliver@gmail.com",
      $password:"auau123",
    }
  } 
  */

  try {

    const adm = req.body;

    genericQuerys.updateTable(adm)
      .then(response => {
        res.send()
      })
      .catch(err => {
        res.status(500).send(err);
      })
  } catch (err) {

    res.status(500).send(err);
  }
}

exports.remove = async (req, res) => {
  /*
     #swagger.tags = ['admin']
     #swagger.summary = 'Deleta uma conta de administrador.' 
    */

  try {

    const id = req.params.id;

    await idSchema.validate(id);

    genericQuerys.deleteTable("adms", id)
      .then(response => {
        res.send(response)
      })
      .catch(err => {

        res.status(500).send(err);
      })

  } catch (err) {

    res.status(500).send(err);
  }
}
