const express = require("express");

const Routes = express.Router();

// validation Middlewares
const idValidation = require('../middlewares/idValidationMiddleware.js');
const validationMiddleware = require('../middlewares/validationMiddleware.js');
const adminMiddleware = require('../middlewares/adminMiddleware');

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
Routes.get('/admin', adminMiddleware(), admController.getAll);
Routes.get('/dashboard', adminMiddleware(), admController.dashboard);
Routes.post('/admin', adminMiddleware(), validationMiddleware(adminSchema), admController.add);
Routes.put('/admin/:id', adminMiddleware(), validationMiddleware(adminSchema), admController.update);
Routes.delete('/admin/:id', adminMiddleware(), admController.remove);

// discount
Routes.get("/dicount", discountController.getAll);
Routes.post("/dicount", adminMiddleware(), validationMiddleware(discountSchema), discountController.add);
Routes.put("/dicount/:id", adminMiddleware(), validationMiddleware(discountSchema), discountController.update);
Routes.delete("/dicount/:id", adminMiddleware(), discountController.remove);

// product
Routes.post("/product", adminMiddleware(), validationMiddleware(productSchema), productController.add)
Routes.put("/product/:id", adminMiddleware(), validationMiddleware(productSchema), productController.update)
Routes.delete("/product/:id", adminMiddleware(), productController.remove)

// procedure
Routes.post('/procedure', validationMiddleware(procedureSchema), procedureController.add)
Routes.put('/procedure/:id', validationMiddleware(procedureSchema), procedureController.update)
Routes.delete('/procedure', procedureController.remove)

module.exports = Routes;
