const express = require("express");

const Routes = express.Router();

const validationMiddleware =require('../middlewares/validationMiddleware.js');


// yup schemas
const adminSchema = require('../validations/adminValidation.js');



// controlers
const admController = require('../controller/admController.js');
const clientController = require('../controller/clientController.js');
const discountController = require('../controller/discountsController.js');
const productController = require('../controller/productController.js');
const procedureController = require('../controller/procedureController.js');
const reservationController = require('../controller/reservationController');

// clients Routes
Routes.get('/client/:id',clientController.getByid );
Routes.post('/client', clientController.add);
Routes.put('/client', clientController.update);
Routes.delete('/client/:id', clientController.remove)

// adms


Routes.get('/admin', admController.getAll);
Routes.get('/dashboard',admController.dashboard);
Routes.post('/admin', admController.add);
Routes.put('/admin', admController.update);
Routes.delete('/admin/:id', admController.remove);


// discount
Routes.get("/dicount",discountController.getAll);
Routes.post("/dicount", discountController.add);
Routes.put("/dicount", discountController.update);
Routes.delete("/dicount", discountController.remove);

// product
Routes.post("/product", productController.add)
Routes.put("/product", productController.update)
Routes.delete("/product", productController.remove)

// procedure

Routes.post('/procedure',procedureController.add)
Routes.put('/procedure/:id', procedureController.update)
Routes.delete('/procedure',procedureController.remove)

// reservation
Routes.get('/reservation',reservationController.getAll);
//Routes.get('/reservation');
Routes.post('/reservation',reservationController.add);
Routes.put('/reservation/:id',reservationController.update)
Routes.delete('/reservation',reservationController.remove)

/*
// request
Routes.get('/request')
Routes.get('/request')
Routes.post('/request')
Routes.put('/request')
Routes.delete('/request')

*/

module.exports = Routes;
