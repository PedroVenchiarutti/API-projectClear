const db = require("../config/db/dbconnect.js");
const express = require("express");

//Instanciando a rota
const userRouter = express.Router();

//Rotas abertas

// Rota de listagem de usuários
userRouter.get("/users", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de criação de usuários
userRouter.post("/users", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});
// Rota de atualização de usuários
userRouter.put("/users", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});
// Consulta de usuários por id
userRouter.patch("/users/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de exclusão de usuários
userRouter.delete("/users/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

module.exports = userRouter;
