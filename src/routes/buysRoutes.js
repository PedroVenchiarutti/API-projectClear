const db = require("../config/db/dbconnect.js");
const express = require("express");

//Instanciando a rota
const buysRoutes = express.Router();

// Rota de listagem de compras
buysRoutes.get("/buy", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de criação de compras
buysRoutes.post("/buy", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de atualização de compras
buysRoutes.put("/buy", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de consulta de compras por id
buysRoutes.patch("/buy/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de exclusão de compras
buysRoutes.delete("/buy", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

module.exports = buysRoutes;
