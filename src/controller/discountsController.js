const discountRepository = require('../repositories/discountRepository.js');
const apiError = require('../error/apiError.js');

// GET ALL DISCOUNTS
exports.getAll = (req, res, next) => {
  /**
  #swagger.tags = ['discount']
  #swagger.summary="busca todos os cupons de discontos"
 */

  discountRepository.select("discounts")
    .then(discounts => {
      res.send(discounts)
    })
    .catch(e => {
      next(apiError.badRequest(e.message))
    })
}

// discount/code
exports.getByCode = (req, res, next) => {
  /**
    #swagger.tags = ['discount']
    #swagger.summary="busca todos os cupons de discontos"
 */

  const code = req.params.code;

  discountRepository.getByCode(code)
    .then(response => {
      res.send(response);
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

//Inserir desconto
exports.add = (req, res, next) => {

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
  console.log(discount)

  discountRepository.insertTable("discounts", discount)
    .then(response => {
      res.send()
    })
    .catch(e => {
      next(apiError.badRequest(e.message))
    })

}

exports.update = (req, res, next) => {
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

  discountRepository.update("discounts", discount)
    .then(response => {
      res.send(response)
    })
    .catch(e => {
      next(apiError.badRequest(e.message))
    })

}

// Remover desconto

exports.remove = (req, res, next) => {

  /**
      #swagger.tags = ['discount']
      #swagger.summary="Remove o cupon de disconto"
      #swagger.parameters['id'] => {
        in:"path",
    }
   */

  const id = req.params.id;

  discountRepository.deleteTable("discounts", id)
    .then(resposne => {
      res.send();
    }, (e) => {
      next(apiError.badRequest(e.message))
    })
}
