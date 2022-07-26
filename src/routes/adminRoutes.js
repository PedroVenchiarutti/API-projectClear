const db = require("../config/db/dbconnect.js");
const express = require("express");

const admController = require("../controller/admController.js");

const adminRoutes = express.Router();

// Rota de listagem de usuários
adminRoutes.get("/admin/users", async (req, res, next) => {

  /* 
    #swagger.tags = ['admin']
    #swagger.summary = 'Busca todos os administradores cadastrados no banco de dados
    #swagger.parameters['id'] =>{
      in: "path",
      description:"Codigo identificador de usuario no banco de dados",
      type:'integer'
    }
   */

  admController.getAll().then(user => {
    res.status(200).send(user);
  })  
});

// Rota de criação de usuários ADMIN
adminRoutes.post("/admin/users", async (req, res, next) => {
 /*
  #swagger.tags = ['admin']
  #swagger.summary = 'Efetua a criação do admin no banco de dados.'
  #swagger.parameters['admin']=>{
    in: 'body',
    description: "Modelo de Admin",
    schema:{
      $name:"Oliver o Adm",
      $email:"oliver@gmail.com",
      $password:"auau123",
    }
  } 
   */

  admController.add(req.body).then(user => {
    res.status(200).json(user);
  }).catch(err => {
    res.status(500).json(err);
  })
});

// Rota de atualização de usuários ADMIN
adminRoutes.put("/admin/users", async (req, res, next) => {
  /*
  #swagger.tags = ['admin']
  #swagger.summary = 'Efetua a alteraçao das informaões do admin.'
  #swagger.parameters['admin']=>{
    in: 'body',
    description: "Modelo de admin",
    schema:{
      $id:12,
      $name:"Oliver o adm",
      $email:"oliver@gmail.com",
      $password:"auau123",
    }
  } 
  */

  let adm = req.body;

  admController.update(adm)
    .then(response=>{
        res.send(response)
    })
    .catch(error=>{
      res.status(500).send(error.message);
    })
});

// Rota de exclusão de usuários ADMIN
adminRoutes.delete("/admin/users/:id", async (req, res, next) => {
  /*
    #swagger.tags = ['admin']
    #swagger.summary = 'Deleta uma conta de administrador.' 
  */
  let id = req.params.id;
  admController.remove(parseInt(id)).then(user=> {
    res.status(200).send(user);
  }).catch( err => {
    res.status(400).send(err.message);
  });
});
module.exports = adminRoutes;
