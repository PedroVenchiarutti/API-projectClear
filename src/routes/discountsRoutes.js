const db = require("../config/db/dbconnect.js");
const express = require("express");

// Controller da rota de descontos
const discountsController = require("../controller/discountsController.js");


const discountsRoutes = express.Router();

// Rota de listagem de descontos
discountsRoutes.get("/discounts", async (req, res, next) => {
  discountsController.getAll().then(discounts => {
    res.status(200).send(discounts);
  }).catch(err => {
    res.status(404).send(err);
  })
});

// Rota de criação de descontos
discountsRoutes.post("/discounts", async (req, res, next) => {
  console.log(req.body)
  discountsController.create(req.body).then(discounts => {
    res.status(200).send(discounts);
  }).catch(err => {
    res.status(404).send(err);
  })
});

// Rota de atualização de descontos
discountsRoutes.put("/discounts/:id", async (req, res, next) => {
  discountsController.update(req.params.id, req.body).then(discounts => {
    res.status(200).send(discounts);
  }).catch(err => {
    res.status(404).send(err);
  })
});

// Rota de consulta de descontos por id
discountsRoutes.patch("/discounts/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de exclusão de descontos
discountsRoutes.delete("/discounts/:id", async (req, res, next) => {
  console.log(req.params.id)
   discountsController.delete(req.params.id).then(discounts => {
    res.status(200).send(discounts);
   }).catch(err => {
    res.status(404).send(err);
   })
});

module.exports = discountsRoutes;
