const db = require("../config/db/dbconnect.js");
const express = require("express");

const reservationController = require("../controller/reservationController.js");


//Instanciando a rota
const reservationsRouter = express.Router();

// Rota de listagem de reservas

reservationsRouter.get("/reservations", async (req, res, next) => {

  // #swagger.description = "Obtem todas as reservas ja realizadas"

  reservationController.getAll().then(reservations => {
    res.send(reservations);
  }).catch(error=>{
    res.status(500).send(error)
  })   

});

// reservations byUser
reservationsRouter.get("/reservations/user/:id", async(req,res,next)=>{

  reservationController.getAll(1).then(x=>{
    res.status(200).send(x);  
  }).catch(error=>{
    res.status(404).send(error);
  })
})

// Rota de criação de reservas
reservationsRouter.post("/reservations", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de atualização de reservas
reservationsRouter.put("/reservations", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});


// Rota de exclusão de reservas
reservationsRouter.delete("/reservations", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});


module.exports = reservationsRouter;