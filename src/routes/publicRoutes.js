const express = require("express");

// Controllers
const client = require("../controller/clientController.js");
const procedures = require("../controller/procedureController.js");
const products = require("../controller/productController.js");
const brands = require('../controller/brandsController');
const login = require("../controller/login.js");
const discount = require("../controller/discountsController.js");
const adminController = require("../controller/admController");

// validations middlewares
const idValidation = require("../middlewares/idValidationMiddleware.js");
const bodyValidation = require("../middlewares/validationMiddleware.js");

// yup schemas
const clientSchema = require("../validations/clientvalidation.js");
const loginSchema = require("../validations/loginValidation.js");

const Routes = express.Router();

// routes
Routes.get("/procedures", procedures.getAll);
Routes.get("/products/:id", products.getById);
Routes.get("/products/pages/:num", products.getWithPagination);
Routes.get("/filter/",products.searchFilter);// queryFilter
Routes.get("/products/", products.getAll);
Routes.get('/brands', brands.getAll);
Routes.get("/discount/:code", discount.getByCode);
Routes.post("/register", bodyValidation(clientSchema), client.add);
Routes.post("/login", bodyValidation(loginSchema), login.login);
Routes.get("/search/:search", products.search);

Routes.use(idValidation());

Routes.post("/admin/login", adminController.login);

Routes.use(idValidation());

module.exports = Routes;
