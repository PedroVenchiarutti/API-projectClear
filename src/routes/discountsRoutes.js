const db = require("../config/db/dbconnect.js");
const express = require("express");

// Controller da rota de descontos
const discountsController = require("../controller/discountsController.js");

const discountsRoutes = express.Router();

// Rota de listagem de descontos
discountsRoutes.get("/discounts", async (req, res, next) => {
  /**
  #swagger.tags = ['discount']
  #swagger.summary="busca todos os cupons de discontos"
 */
  
  discountsController
    .getAll()
    .then((discounts) => {
      res.status(200).send(discounts);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// Rota de criação de descontos
discountsRoutes.post("/discounts", async (req, res, next) => {
  /**
    #swagger.tags = ['discount']
    #swagger.summary="Cria um novo cupon de disconto"
    #swagger.parameters[''] => {
      in:"body",
      description:"modelo de dados do Cupon de disconto",
      schema:{
        $disocunt:50,
        $code:"AUAU",
        dt_limit:1658762344027
      }
  }
 */
  discountsController
    .create(req.body)
    .then((discounts) => {
      res.status(200).send("Desconto cadastrado com sucesso!");
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// Rota de atualização de descontos
discountsRoutes.put("/discounts/:id", async (req, res, next) => {
  /**
    #swagger.tags = ['discount']
    #swagger.summary="Atualiza um novo cupon de disconto"
    #swagger.parameters[''] => {
      in:"body",
      description:"modelo de dados do Cupon de disconto",
      schema:{
        $disocunt:50,
        $code:"AUAU",
        dt_limit:1658762344027
      }
  }
 */
 
  discountsController
    .update(req.body, req.params.id)
    .then((discounts) => {
      res.status(200).send("Desconto atualizado com sucesso!");
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// Rota de consulta de descontos por id
discountsRoutes.get("/discounts/:id", async (req, res, next) => {
/**
    #swagger.tags = ['discount']
    #swagger.summary=""
    #swagger.parameters['id'] => {
      in:"path"
  }
 */

  discountsController
    .get(req.params.id)
    .then((discounts) => {
      res.status(200).send(discounts);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// Rota de exclusão de descontos
discountsRoutes.delete("/discounts/:id", async (req, res, next) => {
/**
    #swagger.tags = ['discount']
    #swagger.summary="Remove o cupon de disconto"
    #swagger.parameters['id'] => {
      in:"path",
  }
 */

  discountsController
    .delete(req.params.id)
    .then((discounts) => {
      res.status(200).send("Desconto excluído com sucesso!");
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

module.exports = discountsRoutes;
