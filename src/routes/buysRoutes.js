const db = require("../config/db/dbconnect.js");
const express = require("express");

//Controller
const buysController = require("../controller/buysController.js");

//Instanciando a rota
const buysRoutes = express.Router();

// Rota de listagem de compras
buysRoutes.get("/buy", async (req, res, next) => {
  buysController.getAll().then(result => {
    res.status(200).send(result);
  }).catch(err => {
    res.status(500).send(err);
  })
});

// Rota de criação de compras
buysRoutes.post("/buy", async (req, res, next) => {
  buysController.create(req.body).then(result => {
    res.status(200).send("Compra criada com sucesso!");
  }).catch(err => {
    res.status(500).send(err);
  })
});



// Rota de consulta de compras por id 
// ve se vai precisar 
/* buysRoutes.get("/buy/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});
 */

// Rota de exclusão de compras
buysRoutes.delete("/buy", async (req, res, next) => {
  buysController.delete(req.body).then(result => {
    res.status(200).send("Compra excluída com sucesso!");
  }).catch(err => {
    res.status(500).send(err);
  })
});

module.exports = buysRoutes;
