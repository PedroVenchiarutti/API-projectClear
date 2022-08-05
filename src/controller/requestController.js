const requestRepository = require('../repositories/requestsRepository.js')
const apiError = require('../error/apiError.js');

exports.getAll = (req, res, next) => {

  /*
   * #swagger.tags = ['request','private']
   * #swagger.description = "Obtem todos as requisisoes ja realizadas no sistema"
   */

  requestRepository.getAll(1)
    .then(results => {

      res.send(results)
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

exports.add = (req, res, next) => {

  const request = req.body;


}

exports.update = (req, res, next) => {}

exports.remove = (req, res, next) => {

  const id = req.params.id;

  requestRepository.deleteTable('request_products', id, "request_id")
    .then(results => {

      requestRepository.deleteTable('requests', id)
        .then(ok => res.send())
    }, (e) => {

      next(apiError.badRequest(e.message));
    }, (e) => {

      next(apiError.badRequest(e.message));
    })
}
