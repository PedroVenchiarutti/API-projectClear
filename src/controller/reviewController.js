const reviewRepository = require("../repositories/reviewRepository");
const apiError = require('../error/apiError.js');

exports.getById = (req, res, next) => {
 /*
      #swagger.tags = ['review','client']
      #swagger.summary="Retorna uma unica avalicao de cliente."
      #swagger.parameters['id'] = {
        in: "path",
        description:"O codigo identificador do usuario no banco de dados",
        type:"integer"
      }
  */
  const id = req.params.id;

  reviewRepository.select("reviews", id)
    .then(reviews => {
      res.send(reviews);
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

exports.getByUserId = (req, res, next) => {
  const userId = req.params.userId;

  reviewRepository.getByUserId(userId).then(reviews => {
    res.send(reviews);
  }, error => {
    next(apiError.badRequest(error.message));
  });
}

exports.add = (req, res, next) => {
  
  /*
      #swagger.tags = ['review','client']
      #swagger.summary="Cria uma unica avalicao."
      #swagger.parameters['review'] = {
        in: "body",
        schema:{
          $stars:3,
          $user_id:1,
          $product_id:2
        }
      }
  */
  const review = req.body;

  reviewRepository.insertTable("reviews", review)
    .then(results => {
      res.send("ok");
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

exports.update = (req, res, next) => {
  /*
      #swagger.tags = ['review','client']
      #swagger.summary="-- NOt Working --Cria uma unica avalicao."
      #swagger.parameters['review'] = {
        in: "body",
        schema:{
          $stars:3,
          $user_id:1,
          $product_id:2
        }
      }
  */
  const review = req.body;

  reviewRepository.updateTable("reviews", review)
    .then(results => {
      res.send()
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

exports.remove = (req, res, next) => {
/*
      #swagger.tags = ['review','client']
      #swagger.summary="Deleta uma unica avalicao de cliente."
      #swagger.parameters['id'] = {
        in: "path",
        description:"O codigo identificador do usuario no banco de dados",
        type:"integer"
      }
  */
  const id = req.params.id;

  reviewRepository.deleteTable("reviews", id)
    .then(results => {
      res.send()
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}
