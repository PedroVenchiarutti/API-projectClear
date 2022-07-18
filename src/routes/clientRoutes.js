const express = require('express');

const db = require('../config/db/dbconnect.js');

const clientRouter = express.Router();


clientRouter.get('/client', async (req,res,next)=>{

  db.query("SELECT * FROM users WHERE id = $1",[1],(err,results)=>{
    console.log(results)
    return res.status(200).send(results)
  })
});



module.exports = clientRouter;
