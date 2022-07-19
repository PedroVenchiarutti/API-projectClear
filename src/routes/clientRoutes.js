const express = require('express');

const db = require('../config/db/dbconnect.js');
const clientController = require('../controller/userController.js');

const clientRouter = express.Router();

/*
clientRouter.get('/client', async (req,res,next)=>{

  db.query("SELECT * FROM users WHERE id = $1",[1],(err,results)=>{
    console.log(results)
    return res.status(200).send(results)
  })
});
*/

clientRouter.get('/client/:id',async(req,res,next)=>{
  
  let id = req.params.id;

  clientController.getUser(parseInt(id)).then(x=>{

    res.send(x);
  })
  

});

module.exports = clientRouter;
