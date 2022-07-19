const db = require("../config/db/dbconnect.js");
const express = require("express");

const admController = require("../controller/admController.js");

const adminRoutes = express.Router();

// Rota de listagem de usuários
adminRoutes.get("/admin/users", async (req, res, next) => {
  admController.getAll().then(user => {
    res.status(200).json(user);
  })
});

// Rota de criação de usuários ADMIN
adminRoutes.post("/admin/users", async (req, res, next) => {
  console.log(req.body);
  admController.add(req.body).then(user => {
    res.status(200).json(user);
  }).catch(err => {
    res.status(500).json(err);
  })
});

// Rota de atualização de usuários ADMIN
adminRoutes.put("/admin/users", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de consulta de usuários por id ADMIN
adminRoutes.patch("/admin/users/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de exclusão de usuários ADMIN
adminRoutes.delete("/admin/users/:id", async (req, res, next) => {
  let id = req.params.id;
  admController.remove(parseInt(id)).then(user=> {
    res.status(200).send(user);
  }).catch( err => {
    res.status(404).send(err);
  });
});
module.exports = adminRoutes;
