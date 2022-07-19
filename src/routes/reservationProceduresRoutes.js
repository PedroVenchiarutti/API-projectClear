const db = require("../config/db/dbconnect.js");
const express = require("express");

const reservationProceduresRoutes = express.Router();

// Rota de listagem de reservas de procedimentos
reservationProceduresRoutes.get(
  "/reservations/procedures",
  async (req, res, next) => {
    res.status(200).send({ message: "Consumir controller ainda!!" });
  }
);

// Rota de criação de reservas de procedimentos
reservationProceduresRoutes.post(
  "/reservations/procedures",
  async (req, res, next) => {
    res.status(200).send({ message: "Consumir controller ainda!!" });
  }
);

// Rota de atualização de reservas de procedimentos
reservationProceduresRoutes.put(
  "/reservations/procedures",
  async (req, res, next) => {
    res.status(200).send({ message: "Consumir controller ainda!!" });
  }
);

// Rota de consulta de reservas de procedimentos por id
reservationProceduresRoutes.patch(
  "/reservations/procedures/:id",
  async (req, res, next) => {
    res.status(200).send({ message: "Consumir controller ainda!!" });
  }
);

// Rota de exclusão de reservas de procedimentos
reservationProceduresRoutes.delete(
  "/reservations/procedures/:id",
  async (req, res, next) => {
    res.status(200).send({ message: "Consumir controller ainda!!" });
  }
);

module.exports = reservationProceduresRoutes;
