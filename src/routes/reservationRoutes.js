const db = require("../config/db/dbconnect.js");
const express = require("express");

const reservationController = require("../controller/reservationController.js");


//Instanciando a rota
const reservationsRouter = express.Router();

// Rota de listagem de reservas

reservationsRouter.get("/reservations", async (req, res, next) => {
  /* 
   #swagger.tags = ['reservations']  
   #swagger.summary = 'Busca todas as reservas e seus procedimentos' 
  */

  reservationController.getAll().then(reservations => {
    res.send(reservations);
  }).catch(error=>{
    res.status(500).send(error)
  })   

});

// reservations byUser
reservationsRouter.get("/reservations/user/:id", async(req,res,next)=>{
/* 
   #swagger.tags = ['reservations']  
  #swagger.summary = 'Busca reservas relaciondas a um usuario especifico." 
  */
  let id = req.params.id;
  reservationController.getAll(id).then(x=>{
    res.status(200).send(x);  
  }).catch(error=>{
    res.status(404).send(error.message);
  })
})

// Rota de criação de reservas
reservationsRouter.post("/reservations", async (req, res, next) => {

  /* 
   #swagger.tags = ['reservations']  
   #swagger.summary = 'Cria uma nova reserva'
   #swagger.parameters['reservation']=>{
      in:"body",
      decription:"Modelo de dados a ser seguido",
      schema:{
        $user_id:4,
        $date:1658838525051,
        $procedures:[1,2,3,4]
      }
  }
  */

  const json = req.body;
  reservationController.add(json)
    .then(response=>{
      res.send(response)
    })
    .catch(error=>{
      res.status(500).send(error.message);
    })

});

// Rota de atualização de reservas
reservationsRouter.put("/reservations", async (req, res, next) => { 
  /* 
   #swagger.tags = ['reservations']  
   #swagger.summary = 'Atualiza uma reserva'
   #swagger.parameters['reservation']=>{
      in:"body",
      decription:"Modelo de dados a ser seguido",
      schema:{
        $id:4,
        $user_id:4,
        $date:1658838525051,
        $procedures:[1,2,3,4]
      }
  }
  */

  const body = req.body;

  reservationController.update(body)
    .then(response=>{
      res.send();
    })
    .catch(error=>{
      res.status(500).send(error.message)
    });

});


// Rota de exclusão de reservas
reservationsRouter.delete("/reservations/:id", async (req, res, next) => {
  /* 
   #swagger.tags = ['reservations']  
   #swagger.summary = 'Deleta uma reserva'

  */

  let id = req.params.id;

  reservationController.remove(id)
    .then(response=>{
        res.send("ok");
    })
    .catch(error=>{
      res.status(500).send(error.message);
    })
});



module.exports = reservationsRouter;
