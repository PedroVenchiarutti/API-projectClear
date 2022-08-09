const requestRepository = require('../repositories/requestsRepository.js')
const apiError = require('../error/apiError.js');

exports.getAll = (req, res, next) => {

  /*
   * #swagger.tags = ['request','private']
   * #swagger.description = "Obtem todos as requisisoes ja realizadas no sistema"
   */

  const list = [];

  requestRepository.getAll(1)
    .then(results => {

      res.send(results)

    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

exports.add = (req, res, next) => {

  /*
   * #swagger.tags = ['requests','private']
   * #swagger.summary = "Cria novos pedidos" 
   * */

  const request = req.body.content;

  requestRepository.insert(request,request.products)
    .then(ok=>{
      res.send()
    },(e)=>{
      next(apiError.badRequest(e.message));
    })
}   

exports.update = (req, res, next) => {

  const request = req.body;

  const id = req.params.id;

  requestRepository.deleteTable('request_products', id)
    .then(results => {
      requestRepository.insert(request)
        .then(ok => {
          res.send()
        }, (e) => {
          next(apiError.badRequest(e.message));
        })
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

exports.remove = (req, res, next) => {

  const id = req.params.id;

  requestRepository.remove(id)
    .then(results => {
      res.send();
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}
