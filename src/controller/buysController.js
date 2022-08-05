const apiError = require('../error/apiError.js');
const buysRepository = require('../repositories/BuysRepositories.js');

exports.getBuys = (req, res, next) => {

  const userId = req.params.id;

  buysRepository.getAll(userId)
    .then(buys => {
      res.send(buys)
    }, (e) => {
      next(apiError.badRequest(e.message))
    })

}

exports.add = (req, res, next) => {
  
  // avaliar a possibilidade da compra estar "totalmente realcionada ao discount"
    
}
exports.getBuys = (req, res, next) => {

  // get All buy And users name;  
}
