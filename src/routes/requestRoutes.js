const db = require("../config/db/dbconnect.js");
const express = require("express");

const requestRoutes = express.Router();

requestRoutes.get("/requests", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

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

module.exports = requestRoutes;