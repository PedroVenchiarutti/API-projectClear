const express = require("express");

const requestController = require("../controller/requestController.js");

const Routes = express.Router();

// a mudança do nome da variavel requestRoutes para
// Routes, ocorreu para evitar um bug que ignora toda
// a rota de 'requests' do swagger autogen

// todas as requisisoes e seus respectivos procedimentos
Routes.get("/requests", async (req, res, next) => {
  
  // #swagger.description = "Obtem todos as requisisoes ja realizadas no sistema"
  
  requestController.getAll().then(all=>{
    res.send(all);
  }).catch(erro=>{
    res.status(404).send(erro);
  })
});

// request by User Id
Routes.get("/requests/user/:id", async (req, res, next) => {
  
  // #swagger.description = "Obtem todos as requisisoes ja realizadas no sistema"
  
  let id = req.params.id 
  
  requestController.getAll(id).then(all=>{
    res.send(all);
  }).catch(erro=>{
    res.status(404).send(erro);
  })
});
/*
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
*/

module.exports = Routes;
