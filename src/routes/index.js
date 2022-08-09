const express = require('express');

// middleware 
const authMiddleware = require('../middlewares/auth.js')

const privateRoutes = require('./privateRoutes.js');
const publicRoutes = require('./publicRoutes.js');

const Routes = express.Router();

Routes.use("/protected", authMiddleware(), privateRoutes);
Routes.use("/public", publicRoutes);

module.exports = Routes;
