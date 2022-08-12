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

exports.getBuys = (req, res, next) => {
  
  
} 

exports.add = (req, res, next) => {
  
  // avaliar a possibilidade da compra estar "totalmente realcionada ao discount"
  
  const buy = req.body;

  // add Compra e update Requests

  buysRepository.getValue(buy.request_id)
    .then(requestValue=>{


    },(e)=>{
      next(apiError.badRequest(e.message))
    })
}
