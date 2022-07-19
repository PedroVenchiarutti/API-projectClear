const db = require("../config/db/dbconnect.js");
const express = require("express");

const reservationController = require("../controller/reservationController.js");


//Instanciando a rota
const reservationsRouter = express.Router();

// Rota de listagem de reservas
reservationsRouter.get("/reservations", async (req, res, next) => {
  reservationController.getAll().then(reservations => {
    res.send(reservations);
  })   

});

// Rota de criação de reservas
reservationsRouter.post("/reservations", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de atualização de reservas
reservationsRouter.put("/reservations", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de consulta de reservas por id
reservationsRouter.patch("/reservations/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

// Rota de exclusão de reservas
reservationsRouter.delete("/reservations", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

module.exports = reservationsRouter;
