const express = require("express");

const Routes = express.Router();

// validation Middlewares
const idValidation = require('../middlewares/idValidationMiddleware.js');
const validationMiddleware = require('../middlewares/validationMiddleware.js');

// yup schemas
const adminSchema = require('../validations/adminValidation.js');
const clientSchema = require('../validations/clientvalidation.js');
const discountSchema = require('../validations/discountValidation.js');
const productSchema = require("../validations/productValidation.js");
const procedureSchema = require("../validations/procedureValidation.js");
const reservationSchema = require("../validations/reservationValidation.js");
const addressSchema = require('../validations/addressValidation.js');

// controlers
const addressController = require('../controller/addressController.js');
const admController = require('../controller/admController.js');
const clientController = require('../controller/clientController.js');
const discountController = require('../controller/discountsController.js');
const productController = require('../controller/productController.js');
const procedureController = require('../controller/procedureController.js');
const reservationController = require('../controller/reservationController');
const requestsController = require('../controller/requestController.js');
const reviewController = require("../controller/reviewController.js")

// id Validation Middleware
Routes.use(idValidation());

// clients Routes
Routes.get('/client/:id', clientController.getByid);
Routes.put('/client/:id', validationMiddleware(clientSchema), clientController.update);
Routes.delete('/client/:id', clientController.remove)

// client - addresses
Routes.get('/client/addresses/:id',addressController.get);
Routes.post('/client/addresses/',validationMiddleware(addressSchema),addressController.add);
Routes.delete('/client/addresses/:id',addressController.remove);

//client - reviews
/*  - em desenvolvimento
Routes.get('/client/reviews/:id')
Routes.post('/client/reviews/:id')
Routes.put('/client/reviews/:id')
Routes.remove('/client/reviews/:id')
*/

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

// reservation
Routes.get('/reservation', reservationController.getAll);
//Routes.get('/reservation');
Routes.post('/reservation', validationMiddleware(reservationSchema), reservationController.add);
Routes.put('/reservation/:id', validationMiddleware(reservationSchema), reservationController.update)
Routes.delete('/reservation', reservationController.remove)

// request
Routes.get('/request', requestsController.getAll)
Routes.post('/request', requestsController.add)

/*
Routes.get('/request')
Routes.put('/request')
Routes.delete('/request')
*/

module.exports = Routes;
