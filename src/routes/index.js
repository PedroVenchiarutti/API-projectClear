const express = require("express");

const Routes = express.Router();

// Este arquivo contera apenas as 
// rotas privadas futuramente
const validate = require('../middlewares/idValidationMiddleware.js');

// controlers
const admController = require('../controller/admController.js');
const clientController = require('../controller/clientController.js');
const discountController = require('../controller/discountsController.js');
const productController = require('../controller/productController.js');
const procedureController = require('../controller/procedureController.js');

// validando id
Routes.use(validate());

// clients Routes
Routes.get('/client/:id',clientController.getByid );
Routes.post('/client', clientController.add);
Routes.put('/client', clientController.update);
Routes.delete('/client/:id', clientController.remove)

// adms

Routes.get('/admin', admController.getAll);
Routes.post('/admin', admController.add);
Routes.put('/admin', admController.update);
Routes.delete('/admin/:id', admController.remove);


// discount
Routes.get("/dicount",discountController.getAll);
//Routes.get("/dicount/code", discountController.getByCode);
Routes.post("/dicount", discountController.add);
Routes.put("/dicount", discountController.update);
Routes.delete("/dicount", discountController.remove);

// product
Routes.get("/product", productController.getAll)
Routes.post("/product", productController.add)
Routes.put("/product", productController.update)
Routes.delete("/product", productController.remove)

// procedure

Routes.get('/procedure', procedureController.getAll)
Routes.post('/procedure',procedureController.add)
Routes.put('/procedure/:id', procedureController.update)
Routes.delete('/procedure',procedureController.remove)

/*
// request
Routes.get('/request')
Routes.get('/request')
Routes.post('/request')
Routes.put('/request')
Routes.delete('/request')


// reservation
Routes.get('/reservation')
Routes.get('/reservation')
Routes.post('/reservation')
Routes.put('/reservation')
Routes.delete('/reservation')
*/

module.exports = Routes;
