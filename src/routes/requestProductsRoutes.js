const db = require("../config/db/dbconnect.js");
const express = require("express");


const requestProductsController = require("../controller/requestController.js");



const requestProductsRoutes = express.Router();

requestProductsRoutes.get("/requests/products", async (req, res, next) => {
    requestProductsController.getAll().then(request => {
     res.status(200).json(request);
    }).catch(err => {
        res.status(502).send(err);
    })
});

requestProductsRoutes.post("/requests/products", async (req, res, next) => {
    requestProductsController.add(req.body).then(request => {
        res.status(200).json(request);
    }).catch(err => {
      res.status(500).send(err);
    })
});

requestProductsRoutes.put("/requests/products", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

requestProductsRoutes.patch("/requests/products/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

requestProductsRoutes.delete("/requests/products/:id", async (req, res, next) => {
  res.status(200).send({ message: "Consumir controller ainda!!" });
});

module.exports = requestProductsRoutes;
