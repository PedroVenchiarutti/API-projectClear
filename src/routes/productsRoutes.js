const db = require("../config/db/dbconnect.js");

const productController = require('../controller/productController');

const Utils= require('../Utils/Utils');

const express = require("express");

const productRouter = express.Router();

// Rota de listagem de produtos
productRouter.get("/product", async (req, res, next) => {
/**
  #swagger.tags = ['product']
  #swagger.summary=""
 */
  
});

// product by id
productRouter.get('/product/:id',async (req,res,next)=>{
/**
  #swagger.tags = ['product']
  #swagger.summary="Busca um produto pelo seu id"
  #swagger.parameters['id'] => {
    in:"path",
  }
 */
  Utils.selectMultiID("products",[req.params.id])
    .then(response=>{
      res.send(response);
    })
    .catch(error=>{
      res.status(500).send(error)
    })

})
// Rota de criação de produtos
productRouter.post("/product", async (req, res, next) => {

/**
  #swagger.tags = ['product']
  #swagger.summary="Adiciona um produto no bando de dados"
  #swagger.parameters['product'] => {
    in: "body",
    description: "modelo de Produto a ser enviado",
    schema:{
      $nome:"Creme para pentear",
      $value:45.80,
      $description:"loren ipsum....",
      $qt:67
    }
  }
 */

  productController.add(req.body)
    .then(response=>{
      res.send(response)
    })
    .catch(error=>{
      res.status(500).send(error);
    })

});

// Rota de atualização de produtos
productRouter.put("/product", async (req, res, next) => {

/**
  #swagger.tags = ['product']
  #swagger.summary="Atualizacao dos dados de um produto"
  #swagger.parameters['product'] => {
    in:"body",
    description:"modelo de Produto a ser enviado",
    schema:{
      $nome:"Creme para pentear",
      $value:45.80,
      $description:"loren ipsum....",
      $qt:67
    }
  }
 */
  productController.update(req.body)
    .then(response=>{
      res.send(response)
    }).catch(error=>{
      res.status(500).send(error.messagge)
    })
});

// Rota de exclusão de produtos
productRouter.delete("/product/:id", async (req, res, next) => {
  /**
  #swagger.tags = ['product']
  #swagger.summary="Remove um produto do banco de dados"
  #swagger.parameters['id'] => {
    in:"path",
    description:"Codigo identificador do produto",
    type:"itenger"
  }
 */

  productController.remove(req.params.id)
    .then(response=>{
      res.send(response)
    })
    .catch(error=>{
      res.status(500).send(error)
    })  
});

module.exports = productRouter;
