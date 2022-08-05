const genericQuerys = require("../repositories/genericQuerys.js");

exports.get = (req, res, next) => {

  const id = req.params.id;

  genericQuerys.select("reviews", id)
    .then(reviews => {
      res.send(reviews);
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

exports.add = (req, res, next) => {

  const review = req.body;

  genericQuerys.insertTable("reviews", review)
    .then(results => {
      res.send("ok");
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

exports.update = (req, res, next) => {

  const review = req.body;

  genericQuerys.updateTable("reviews", review)
    .then(results => {
      res.send()
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

exports.remove = (req, res, next) => {

  const id = req.params.id;

  genericQuerys.deleteTable("reviews", id)
    .then(results => {
      res.send()
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}
