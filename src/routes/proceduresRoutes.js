const db = require("../config/db/dbconnect.js");
const express = require("express");

//Instanciando a rota
const proceduresRouter = express.Router();

// Rota de listagem dos procedimentos
proceduresRouter.get("/procedures", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de criação de procedimentos
proceduresRouter.post("/procedures", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de atualização de procedimentos
proceduresRouter.put("/procedures", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de consulta de procedimentos por id
proceduresRouter.patch("/procedures/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de exclusão de procedimentos
proceduresRouter.delete("/procedures/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

module.exports = proceduresRouter;
