const db = require('../config/db/dbconnect.js');

const express = require('express');

const productRouter = express.Router();

productRouter.get("/product",(req,res)=>{

  res.send("Ola")
});


module.exports = productRouter;
