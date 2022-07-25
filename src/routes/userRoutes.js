const db = require("../config/db/dbconnect.js");

const express = require("express");

const userController = require("../controller/userController.js");

//Instanciando a rota
const userRouter = express.Router();

//Rotas abertas

// Rota de listagem de usuários
userRouter.get("/users/:id", async (req, res, next) => {
  userController
    .getUser(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Rota de criação de usuários
userRouter.post("/users", async (req, res, next) => {
  userController
    .addUser(req.body)
    .then((user) => {
      res.status(200).json("Usuário criado com sucesso");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Rota de atualização de usuários
userRouter.put("/users/:id", async (req, res, next) => {
  res.send("Atualizar usuário");
});

// Rota de exclusão de usuários
userRouter.delete("/users/:id", async (req, res, next) => {
  userController
    .removeUser(req.params.id)
    .then((user) => {
      res.status(200).send("Usuário excluído com sucesso");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = userRouter;
