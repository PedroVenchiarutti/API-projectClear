const express = require("express");

const requestController = require("../controller/requestController.js");

const Routes = express.Router();

// a mudança do nome da variavel requestRoutes para
// Routes, ocorreu para evitar um bug que ignora toda
// a rota de 'requests' do swagger autogen

// todas as requisisoes e seus respectivos procedimentos
Routes.get("/requests", async (req, res, next) => {

  /*
    #swagger.tags = ['requests']
    #swagger.summary = "Busca todos os pedidos"
  */

  requestController.getAll().then(all => {
    res.send(all);
  }).catch(erro => {
    res.status(404).send(erro);
  })
});

// request by User Id
Routes.get("/requests/user/:id", async (req, res, next) => {
  /*
    #swagger.tags = ['requests']
    #swagger.summary = "Busca todos os pedidos"
  */

  let id = req.params.id

  requestController.getAll(id).then(all => {
    res.send(all);
  }).catch(erro => {
    res.status(404).send(erro);
  })
});


Routes.post("/requests", async (req, res, next) => {
  /*
    #swagger.tags = ["requests"]
    #swagger.summary = "Realiza um novo pedido"
    #swagger.parameters[''] =>{
      in: "body",
      description:"Modelo de dados",
      schema:{
        $user_id:1,
        $products:{
          $qt_product:22,
          $product_id:1
        }
        
      }
    }
  */

  res.status(200).send({
    message: "Consumir controller ainda!!"
  });
});

Routes.put("/requests", async (req, res, next) => {
  /*
    #swagger.tags = ["requests"]
    #swagger.summary = "Atualiza um novo pedido"
    #swagger.parameters[''] =>{
      in: "body",
      description:"Modelo de dados",
      schema:{
        $request_id:1,
        $user_id:1,
        $products:{
          $qt_product:22,
          $product_id:1
        }
        
      }
    }
  */
  res.status(200).send({
    message: "Consumir controller ainda!!"
  });
});


Routes.delete("/requests/:id", async (req, res, next) => {
  /*
    #swagger.tags = ["requests"]
    #swagger.summary = "Delete um pedido" 
  */

  res.status(200).send({
    message: "Consumir controller ainda!!"
  });
});

module.exports = Routes;
