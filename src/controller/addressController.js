const genericQuerys = require("../repositories/genericQuerys.js");

// client addresses
exports.get = (req, res, next) => {

  const id = req.params.id;

  genericQuerys.select('addresses', id)
    .then(addresses => {
      res.send(addresses)
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

exports.add = (req, res, next) => {

  const address = req.body;

  genericQuerys.insertTable("addresses", address)
    .then(results => {
      res.send();
    }, (e) => {

      next(apiError.badRequest(e.message));
    })
}

exports.remove = (req, res, next) => {

  const id = req.params.id;

  genericQuerys.deleteTable("addresses", id)
    .then(results => {
      res.send();
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}
