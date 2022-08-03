const genericQuerys = require('../repositories/genericQuerys.js');
const db = require('../config/dbconnect.js');
const reservationRepository = require('../repositories/reservationRepository.js');
const utils = require('../helpers/Utils.js');
const formatter = require('../helpers/jsonFormatter.js');

const validate = require('../middlewares/validationMiddleware.js');
const reservationSchema = require('../validations/reservationValidation.js');

const apiError = require('../error/apiError.js');

exports.getAll = (req, res, next) => {

  genericQuerys.select('reservations')
    .then(reservations => {

      const rpIds = utils.resJsonToArray(reservations, "id");

      const userid = utils.resJsonToArray(reservations, "user_id")

      reservationRepository.getReservation_procedures(rpIds)
        .then(reservationProcedures => {

          const procedureIds = utils.resJsonToArray(reservationProcedures, "procedure_id");

          genericQuerys.selectMultiID("procedures", procedureIds)
            .then(procedures => {

              genericQuerys.selectMultiID("users", userid)
                .then(users => {

                  const list = formatter(reservations, reservationProcedures, procedures, users);

                  res.send(list)
                }, (e) => {
                  next(apiError.badRequest(e.message))
                })

            }, (e) => {

              next(apiError.badRequest(e.message))
            });

        }, (e) => {

          next(apiError.badRequest(e.message))
        })

    }, (e) => {
      next(apiError.badRequest(e.message))
    });
}

exports.add = validate(reservationSchema), (req, res, next) => {
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
   
  reservationRepository.refreshReservation(id,reservation.procedures)
    .then(e => {
      
      res.send(e);
    }, (e) => {
      next(apiError.badRequest(e.message))
    })
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
