const db = require("../config/db/dbconnect.js");

const express = require("express");

const productRouter = express.Router();

// Rota de listagem de produtos
productRouter.get("/product", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de criação de produtos
productRouter.post("/product", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de atualização de produtos
productRouter.put("/product", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de consulta de produtos por id
productRouter.patch("/product/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de exclusão de produtos
productRouter.delete("/product", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

module.exports = productRouter;
