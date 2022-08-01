const discountRepository = require('../repositories/discountRepository.js');
const validate = require('../middlewares/validationMiddleware.js');
const discountSchema = require('../validations/discountValidation.js');
const genericQuerys = require('../repositories/genericQuerys.js');

const apiError = require('../error/apiError.js');


// GET ALL DISCOUNTS
exports.getAll = (req, res, next) => {
  /**
  #swagger.tags = ['discount']
  #swagger.summary="busca todos os cupons de discontos"
 */

  genericQuerys.select("discounts")
    .then(discounts => {
      res.send(discounts)
    })
    .catch(e => {
      next(apiError.badRequest(e.message))
    })
}

// discount/code
exports.getByCode = (req, res) => {
  /**
    #swagger.tags = ['discount']
    #swagger.summary="busca todos os cupons de discontos"
 */

  const code = req.body.code;

  discountRepository.getByCode(code)
    .then(response => {
      res.send(response);
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

//Inserir desconto
exports.add = validate(discountSchema), (req, res, next) => {

  /**
    #swagger.tags = ['discount']
    #swagger.summary="Cria um novo cupon de disconto"
    #swagger.parameters[''] => {
      in:"body",
      description:"modelo de dados do Cupon de disconto",
      schema:{
        $disocunt:50,
        $code:"AUAU",
        dt_limit:1658762344027
      }
  }
 */

  const discount = req.body;

  discountRepository.add(disocunt)
    .then(response => {
      res.send()
    })
    .catch(e => {
      next(apiError.badRequest(e.message))
    })

}

exports.update = validate(discountSchema), (req, res, next) => {
  /**
    #swagger.tags = ['discount']
    #swagger.summary="Atualiza um novo cupon de disconto"
    #swagger.parameters[''] => {
      in:"body",
      description:"modelo de dados do Cupon de disconto",
      schema:{
        $disocunt:50,
        $code:"AUAU",
        dt_limit:1658762344027
      }
  }
 */

  const discount = req.body;

  discountRepository.update(discount)
    .then(response => {
      res.send(response)
    })
    .catch(e => {
      next(apiError.badRequest(e.message))
    })

}

// Remover desconto

exports.remove = (req, res) => {

  /**
      #swagger.tags = ['discount']
      #swagger.summary="Remove o cupon de disconto"
      #swagger.parameters['id'] => {
        in:"path",
    }
   */

  genericQuerys.deleteTable("discounts", id)
    .then(resposne => {
      res.send();
    }, (e) => {
      next(apiError.badRequest(e.message))
    })
}
