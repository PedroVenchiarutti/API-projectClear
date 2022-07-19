const express = require('express');

const db = require('../config/db/dbconnect.js');
const userController = require("../controller/userController");

const clientRouter = express.Router();


clientRouter.get("/user/:id",(req,res,next)=>{
  let id = req.params.id;
  userController.getUser(parseInt(id)).then(x=>{
    res.status(200).send(x);
  }).catch( err => {
    res.status(404).send(err);
  }
  );
    ;
})

// Rota de atualização de clientes
clientRouter.put("/client/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de exclusão de clientes
clientRouter.delete("/client/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

module.exports = clientRouter;
