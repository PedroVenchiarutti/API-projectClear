const reservationRepository = require('../repositories/reservationRepository.js');
const apiError = require('../error/apiError.js');

exports.getAll = (req, res, next) => {
  /*
       #swagger.tags = ['reservation']
       #swagger.summary="Retorna todas as reservas realizadas"
   */
  reservationRepository.getAll()
    .then(reservations => {
      res.send(reservations)
    }, (e) => {
      next(apiError.badRequest(e.message))
    })
}

// getByUser

exports.add = (req, res, next) => {
  /**
     #swagger.tags = ['reservation']
     #swagger.summary="Atualiza uma reservas."
     #swagger.parameters['reservation'] => {
       in:"body",
       description:"modelo de dados dos Procedimentos",
       schema:{
         $date:1,
         $user_id:1,
         procedures:[
           1
         ]
       }
     }
  */

  const reservation = req.body;

  reservationRepository.add(reservation)
    .then(results => {
      res.send();
    }, (e) => {
      next(apiError.badRequest(e.message))
    })
}

exports.update = (req, res, next) => {
  /**
       #swagger.tags = ['reservation']
       #swagger.summary="Atualiza uma reservas."
       #swagger.parameters['reservation'] => {
         in:"body",
         description:"modelo de dados dos Procedimentos",
         schema:{
           $date:1,
           $user_id:1,
           procedures:[
             1
           ]
         }
       }
    */

  const id = req.params.id;

  const reservation = req.body;

  reservationRepository.update(reservation, id)
    .then(res => {
      res.send()
    }, (e) => {
      next(apiError.badRequest(e.message))
    })
}

exports.remove = (req, res, next) => {
  /*
        #swagger.tags = ['reservation']
        #swagger.summary="Deleta uma reserva."
     */
  const id = req.params.id;

  genericQuerys.deleteTable("reservation_procedures", id, "reservation_id")
    .then(() => {
      res.send();
    }, (e) => {
      next(apiError.badRequest(e.message))
    })
}
