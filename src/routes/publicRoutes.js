const express = require('express')

const client = require('../controller/clientController.js');
const procedures = require('../controller/procedureController.js')
const products = require('../controller/products');
const login = require('../controller/login.js');
const discount = require('../controller/discountsController.js');

const idValidation = require('../middlewares/idValidation');

const Routes = express.Router();

Routes.get('/login',login);
Routes.get('/procedures',procedures.getAll);
Routes.get('/products', products.getAll);
Routes.get('/discount/code',discount.getByCode);
Routes.post('/resgister',client.add);

Routes.use(idValidation());
Routes.get('/products/:id',products.getId);

module.exports = Routes;
