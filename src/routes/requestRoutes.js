const express = require("express");

const requestController = require("../controller/requestController.js");

const requestRoutes = express.Router();

requestRoutes.get("/requests", async (req, res, next) => {

  requestController.getAll().then(all=>{
    res.send(all);
  }).catch(erro=>{
    res.status(404).send(erro);
  })
});

requestRoutes.post("/requests", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

requestRoutes.put("/requests", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

requestRoutes.patch("/requests/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

requestRoutes.delete("/requests/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

module.exports = requestRoutes;
