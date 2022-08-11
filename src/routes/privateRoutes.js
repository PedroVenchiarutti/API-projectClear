const express = require("express");

const Routes = express.Router();

// validation Middlewares
const idValidation = require('../middlewares/idValidationMiddleware.js');
const validationMiddleware = require('../middlewares/validationMiddleware.js');

// yup schemas
const adminSchema = require('../validations/adminValidation.js');
const discountSchema = require('../validations/discountValidation.js');
const productSchema = require("../validations/productValidation.js");
const procedureSchema = require("../validations/procedureValidation.js");


// controlers
const admController = require('../controller/admController.js');
const discountController = require('../controller/discountsController.js');
const productController = require('../controller/productController.js');
const procedureController = require('../controller/procedureController.js');
const reservationController = require('../controller/reservationController');
const requestsController = require('../controller/requestController.js');

// id Validation Middleware
Routes.use(idValidation());

// adms
Routes.get('/admin', admController.getAll);
Routes.get('/dashboard',admController.dashboard);
Routes.post('/admin', validationMiddleware(adminSchema), admController.add);
Routes.put('/admin/:id', validationMiddleware(adminSchema), admController.update);
Routes.delete('/admin/:id', admController.remove);

// discount
Routes.get("/dicount", discountController.getAll);
Routes.post("/dicount", validationMiddleware(discountSchema), discountController.add);
Routes.put("/dicount/:id", validationMiddleware(discountSchema), discountController.update);
Routes.delete("/dicount", discountController.remove);

// product
Routes.post("/product", validationMiddleware(productSchema), productController.add)
Routes.put("/product/:id", validationMiddleware(productSchema), productController.update)
Routes.delete("/product", productController.remove)

// procedure
Routes.post('/procedure', validationMiddleware(procedureSchema), procedureController.add)
Routes.put('/procedure/:id', validationMiddleware(procedureSchema), procedureController.update)
Routes.delete('/procedure', procedureController.remove)

module.exports = Routes;
