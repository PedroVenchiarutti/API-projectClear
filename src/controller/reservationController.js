const genericQuerys = require('../repositories/genericQuerys.js');
const reservationRepository = require('../repositories/reservationRepository.js');

const apiError = require('../error/apiError.js');

exports.getAll = (req, res, next) => {

  reservationRepository.getAll()
    .then(reservations => {
      res.send(reservations)
    }, (e) => {
      next(apiError.badRequest(e.message))
    })
}

exports.add = (req, res, next) => {

  const reservation = req.body;

  reservationRepository.add(reservation.user_id, reservation.date)
    .then(id => {

      reservationRepository.addReservationProcedures(id, reservation.procedures)
        .then(res => {
            res.send();
          },
          (e) => {
            next(apiError.badRequest(e.message))
          })
    })
}

exports.update = (req, res, next) => {

  const id = req.params.id;

  const reservation = req.body;

}

exports.remove = (req, res, next) => {

  const id = req.params.id;

  genericQuerys.deleteTable("reservation_procedures", id, "reservation_id")
    .then(() => {
      res.send();
    }, (e) => {
      next(apiError.badRequest(e.message))
    })

}
