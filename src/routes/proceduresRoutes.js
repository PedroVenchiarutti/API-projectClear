const db = require("../config/db/dbconnect.js");
const express = require("express");


const procedureController = require("../controller/procedureController.js");

//Instanciando a rota
const proceduresRouter = express.Router();

// Rota de listagem dos procedimentos
proceduresRouter.get("/procedures", async (req, res, next) => {
  /**
    #swagger.tags = ['procedure']
    #swagger.summary="Busca todos os procedimentos cadastrados."
 */
  procedureController.getAll().then(procedures => {
    res.status(200).send(procedures);
  }).catch(err => {
    res.status(500).send(err);
  })
});

// Rota de consulta de procedimentos por id
proceduresRouter.get("/procedures/:id", async (req, res, next) => {
 /**
    #swagger.tags = ['procedure']
    #swagger.summary="Busca um procedimento pelo seu id"
    #swagger.parameters['id'] => {
      in:"path",
  }
 */
  let id = []
  id.push(req.params.id);
  procedureController.getById(id).then(procedure => {
    res.status(200).send(procedure);
 }).catch(err => {
    res.status(500).send(err);
  })
 });


// Rota de criação de procedimentos
proceduresRouter.post("/procedures", async (req, res, next) => {
/**
    #swagger.tags = ['procedure']
    #swagger.summary="Adiciona um procedimento"
    #swagger.parameters['procedure'] => {
      in:"body",
      description:"modelo de dados dos Procedimentos",
      schema:{
        $name:"Corte de cabelo",
        $value:35.00,
        $categorie:"corte"
      }
  }
 */

  procedureController.add(req.body).then(procedure => {
  res.status(201).send(procedure);
 }).catch(err => {
  res.status(500).send(err);
 })
});

// Rota de atualização de procedimentos
proceduresRouter.put("/procedures", async (req, res, next) => {
  /**
    #swagger.tags = ['procedure']
    #swagger.summary="Atualiza um procedimento"
    #swagger.parameters['procedure'] => {
      in:"body",
      description:"modelo de dados dos Procedimentos",
      schema:{
        $name:"Corte de cabelo",
        $value:35.00,
        $categorie:"corte"
      }
  }
 */
  procedureController.update(req.body).then(procedure => {
    res.status(200).send(procedure);
  }).catch(err =>  {
    res.status(500).send(err);
    })
});


// Rota de exclusão de procedimentos
proceduresRouter.delete("/procedures/:id", async (req, res, next) => {
  /**
    #swagger.tags = ['procedure']
    #swagger.summary="Remove um procedimento"
    #swagger.parameters['id'] => {
      in:"path",
  }
 */

  procedureController.delete(req.params.id).then(procedure => {
    res.status(200).send(procedure);
  }).catch(err => {
    res.status(500).send(err);
    })
});

module.exports = proceduresRouter;
