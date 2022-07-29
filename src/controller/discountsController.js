const discountRepository = require('../repositories/discountRepository.js');
const validate = require('../middlewares/validationMiddleware.js');
const discountSchema = require('../validations/discountValidation.js');
const genericQuerys = require('../repositories/genericQuerys.js');

// GET ALL DISCOUNTS
exports.getAll = (req, res) => {
  /**
  #swagger.tags = ['discount']
  #swagger.summary="busca todos os cupons de discontos"
 */

  try {
    genericQuerys.select("discounts")
      .then(discounts => {
        res.send(discounts)
      })
      .catch(err => {
        res.status(500).send(err)
      })
  } catch {
    res.send('f api')
  }
}

// discount/code
exports.getByCode = (req, res) => {

  try {

  } catch {
    res.send('f api')
  }
}

//Inserir desconto
exports.add = validate(discountSchema), (req, res) => {
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

  try {

    const discount = req.body;
    discountRepository.add(disocunt)
      .then(response => {
        res.send()
      })
      .catch(err => {
        res.status(400).send(err)
      })
  } catch {

  }

}

exports.update = validate(discountSchema), (req, res) => {
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

  try {

    const discount = req.body;

    discountRepository.update(discount)
      .then(response => {
        res.send(response)
      })
      .catch(err => {

        res.status(400).send(err)
      })

  } catch {
    res.send('f api')
  }

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

  try {} catch {
    res.send('f api')
  }
}
