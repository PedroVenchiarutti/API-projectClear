const express = require('express');

const client = require('../controller/clientController.js');
const procedures = require('../controller/procedureController.js')
const products = require('../controller/productController.js');
const login = require('../controller/login.js');
const discount = require('../controller/discountsController.js');

const idValidation = require('../middlewares/idValidationMiddleware.js');
const bodyValidation = require('../middlewares/validationMiddleware.js');

const clientSchema = require('../validations/clientvalidation.js');
const loginSchema = require('../validations/loginValidation.js');

const Routes = express.Router();

Routes.use(idValidation());

Routes.get('/procedures', procedures.getAll);
Routes.get('/products', products.getAll);
Routes.get('/discount/:code', discount.getByCode);
Routes.post('/resgister', bodyValidation(clientSchema), client.add);
//Routes.get('/login', bodyValidation(loginSchema),login.login)
Routes.get('/products/:id', products.getById);

module.exports = Routes;
