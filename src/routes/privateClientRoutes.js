const express = require("express");

const Routes = express.Router();

// controllers
const clientController = require('../controller/clientController.js');
const addressController = require('../controller/addressController.js');
const reviewController = require('../controller/reviewController.js');

// validation Middlewares
const idValidation = require('../middlewares/idValidationMiddleware.js');
const validationMiddleware = require('../middlewares/validationMiddleware.js');
const reservationController = require('../controller/reservationController');
const requestsController = require('../controller/requestController.js');

// yup Schemas
const clientSchema = require('../validations/clientvalidation.js');
const reservationSchema = require("../validations/reservationValidation.js");
const addressSchema = require('../validations/addressValidation.js');
const reviewSchema = require('../validations/reviewValidation.js');

Routes.use(idValidation());

// clients Routes
Routes.get('/client/:id', clientController.getByid);
Routes.put('/client/:id', validationMiddleware(clientSchema), clientController.update);
Routes.delete('/client/:id', clientController.remove)

// addresses
Routes.get('/addresses/:id', addressController.getById);
Routes.get('/client/addresses/all/:id', addressController.getByUserId );
Routes.post('/client/addresses', validationMiddleware(addressSchema), addressController.add);
Routes.delete('/client/addresses/:id', addressController.remove);

Routes.get('/client/reviews/:id',reviewController.getById);
Routes.post('/client/reviews', validationMiddleware(reviewSchema), reviewController.add);
Routes.put('/client/reviews/:id', validationMiddleware(reviewSchema), reviewController.add);
Routes.delete('/client/reviews/:id', reviewController.remove);

// reservation
Routes.get('/reservation', reservationController.getAll);
//Routes.get('/reservation');
Routes.post('/reservation', validationMiddleware(reservationSchema), reservationController.add);
Routes.put('/reservation/:id', validationMiddleware(reservationSchema), reservationController.update)
Routes.delete('/reservation', reservationController.remove)

// request
Routes.get('/request', requestsController.getAll)
Routes.post('/request', requestsController.add)
Routes.delete('/request/:id', requestsController.remove)

/*
Routes.get('/request')
Routes.delete('/request')
*/

module.exports = Routes;
