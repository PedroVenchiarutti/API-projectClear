const genericQuerys = require("../repositories/genericQuerys.js");

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

  genericQuerys.select("reviews", id)
    .then(reviews => {
      res.send(reviews);
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
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

  genericQuerys.insertTable("reviews", review)
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

  genericQuerys.updateTable("reviews", review)
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

  genericQuerys.deleteTable("reviews", id)
    .then(results => {
      res.send()
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}
