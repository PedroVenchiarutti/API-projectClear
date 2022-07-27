const express = require('express');

const db = require('../config/db/dbconnect.js');
const userController = require("../controller/userController");

const clientRouter = express.Router();


clientRouter.get("/user/:id", (req, res, next) => {

  /*
    #swagger.tags = ['client']
    #swagger.summary="busca um unico cadastro de cliente no banco de dados"
    #swagger.parameters['id'] = {
    in: "path",
    description:"O codigo identificador do usuario no banco de dados",
    type:"intenger"
  }
   
   */

  let id = req.params.id;

  userController.getUser(parseInt(id)).then(x => {
    res.status(200).send(x);
  }).catch(err => {
    res.status(404).send(err);
  });;
})

clientRouter.post('/client', async (req, res, next) => {

  /*
    #swagger.tags = ['client']
    #swagger.summary = 'Cria uma nova conta de cliente.'
    #swagger.parameters['user']=>{
    in: 'body',
    description: "Modelo de Usuario",
    schema:{
      $name:"Oliver",
      $email:"oliver@gmail.com",
      $password:"auau123",
      $phone:1398765432,
      $cpf:88888888888,
      $sexo:"M",
      $birth:1658757654250,
      $img_url:"link.com.br/img.png"
    }
  } 
   */
  userController.addUser(req.body)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      res.status(500).send(error.message);
    })
});

// Rota de atualização de clientes
clientRouter.put("/client/", async (req, res, next) => {

  /*
   #swagger.tags = ['client']  
   #swagger.summary = 'Altera os dados de uma conta client. '
   #swagger.parameters['user']=>{
    in: 'body',
    description: "Modelo de Usuario",
    schema:{
      $id:12,
      $name:"Oliver",
      $email:"oliver@gmail.com",
      $password:"auau123",
      $phone:1398765432,
      $cpf:88888888888,
      $sexo:"M",
      $birth:1658757654250,
      $img_url:"link.com.br/img.png"
    }
  } 
   */
  res.status(200).send({
    message: "Consumir controller ainda!!"
  });
});

// Rota de exclusão de clientes
clientRouter.delete("/client/:id", async (req, res, next) => {

  /* 
  #swagger.tags = ['client']
  #swagger.summary = 'Deleta um usuario do banco de dado a partir do seu id.'
  #swagger.parameters['id'] = {
    in: "path",
    description:"O codigo identificador do usuario no banco de dados",
    type:"intenger"
  }
   
   */
  res.status(200).send({
    message: "Consumir controller ainda!!"
  });
});

module.exports = clientRouter;
