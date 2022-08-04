const express = require('express');

const privateRoutes = require('./privateRoutes.js');
const publicRoutes = require('./publicRoutes.js');

const Routes = express.Router();

Routes.use("/api", privateRoutes);
Routes.use('/public', publicRoutes)

module.exports = Routes;
