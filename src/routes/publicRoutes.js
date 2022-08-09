const express = require('express');

// Controllers 
const client = require('../controller/clientController.js');
const procedures = require('../controller/procedureController.js')
const products = require('../controller/productController.js');
const login = require('../controller/login.js');
const discount = require('../controller/discountsController.js');

// validations middlewares
const idValidation = require('../middlewares/idValidationMiddleware.js');
const bodyValidation = require('../middlewares/validationMiddleware.js');

// yup schemas
const clientSchema = require('../validations/clientvalidation.js');
const loginSchema = require('../validations/loginValidation.js');

const Routes = express.Router();

Routes.use(idValidation());

// routes
Routes.get('/procedures', procedures.getAll);
Routes.get('/products/pages/:num', products.getAll);
Routes.get('/products/:id', products.getById);
Routes.get('/discount/:code', discount.getByCode);
Routes.post('/register', bodyValidation(clientSchema), client.add);
Routes.get('/login', bodyValidation(loginSchema), login.login)
Routes.get('/products/:id', products.getById);

module.exports = Routes;
