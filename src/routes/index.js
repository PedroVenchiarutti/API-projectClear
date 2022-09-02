const express = require('express');

// middleware 
const authMiddleware = require('../middlewares/auth.js')

const privateRoutes = require('./privateRoutes.js');
const publicRoutes = require('./publicRoutes.js');
const privateClientRoutes = require("./privateClientRoutes.js");

const Routes = express.Router();

// Routes.use("/protected", authMiddleware(false), privateClientRoutes);
// Routes.use("/protected", authMiddleware(true), privateRoutes);
Routes.use("/protected", privateClientRoutes);
Routes.use("/protected", privateRoutes);
Routes.use("/public", publicRoutes);

module.exports = Routes;