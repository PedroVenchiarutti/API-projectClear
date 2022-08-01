const Utils = require('../helpers/Utils');

const apiError = require('../error/apiError.js');
const genericQuerys = require('../repositories/genericQuerys.js');

const validationSchema = require('../validations/procedureValidation.js')
const validate = require('../middlewares/validationMiddleware.js');


exports.getAll = (req, res, next) => {
  /**
     #swagger.tags = ['procedure']
     #swagger.summary="Busca todos os procedimentos cadastrados."
  */

  genericQuerys.select("procedures")
    .then(procedures => {
      res.send(procedures)
    })
    .catch(e => {
      next(apiError.badRequest(e.message))
    })
}

exports.add = validate(validationSchema), (req, res, next) => {

  /**
      #swagger.tags = ['procedure']
      #swagger.summary="Adiciona um procedimento"
      #swagger.parameters['procedure'] => {
        in:"body",
        description:"modelo de dados dos Procedimentos",
        schema:{
          $name:"Corte de cabelo",
          $value:35.00,
          $categorie:"corte"
        }
    }
   */

  const body = req.body;

  genericQuerys.insertTable("procedures", body)
    .then(response => {
      res.send();
    })
    .catch(e => {
      next(apiError.badRequest(e.message))
    })
}

exports.update = validate(validationSchema), (req, res, next) => {
  /**
      #swagger.tags = ['procedure']
      #swagger.summary="Atualiza um procedimento"
      #swagger.parameters['procedure'] => {
        in:"body",
        description:"modelo de dados dos Procedimentos",
        schema:{
          $name:"Corte de cabelo",
          $value:35.00,
          $categorie:"corte"
        }
    }
   */

  const body = req.body;

  genericQuerys.upadateTable('procedures', body)
    .then(response => {
      res.send();
    })
    .catch(e => {

      next(apiError.badRequest(e.message))
    })

}


exports.remove = (req, res, next) => {

  /**
      #swagger.tags = ['procedure']
      #swagger.summary="Remove um procedimento"
      #swagger.parameters['id'] => {
        in:"path"
    }
   */

  const id = req.params.id;

  genericQuerys.deleteTable("procedure", id)
    .then(response => {
      res.send(response)
    })
    .catch(e => {

      next(apiError.badRequest(e.message))
    });
}
