const db = require("../config/db/dbconnect.js");
const Utils = require("../Utils/Utils.js");
const userController = require('./userController');

//Reservation Controller do reservationRouter.js

module.exports = {

  getProcedures(reservation_id) {

    return new Promise((resolve, reject) => {

      db.query(`SELECT procedure_id FROM reservation_procedures
                        WHERE reservation_id = $1`,
        [reservation_id],
        (err, res) => {
          if (err) {
            reject(err);
          } else {

            let ids = Utils.resJsonToArray(res.rows, "procedure_id");

            Utils.selectMultiID(ids)
              .then(procedures => {
                resolve(procedures);
              }).catch(error => {
                reject(error.message)
              })
          }
        });
    })
  },

  // paginacao futura
  // select test
  // usuario ou all
  getAll(userId = null) {
    return new Promise((resolve, reject) => {

      const list = [];
      let query = userId ?
        `SELECT * FROM reservations WHERE user_id = ${userId}` :
        "SELECT * FROM reservations";
      console.log(query)
      db.query(query, (reservationErr, reservations) => {

        if (reservationErr) {
          reject({
            error: reservationErr.message
          });
        } else {

          let query = `SELECT * FROM reservation_procedures
                            WHERE reservation_id IN (`;

          let params = Utils.resJsonToArray(reservations.rows, "id")

          query = Utils.inIds(query, params);

          db.query(query, params, (rpError, rpResolve) => {

            if (rpError) {
              reject(rpError)
            } else {
              Utils.selectMultiID("procedures", Utils.resJsonToArray(rpResolve.rows, "procedure_id"))
                .then(procedures => {


                  userController.getName(Utils.resJsonToArray(reservations.rows, "user_id")).then(users => {

                    reservations.rows.forEach(reservation => {

                      let procedureArray = [];
                      let user = null;

                      users.rows.forEach(userElement => {
                        if (userElement.id == reservation.user_id) {
                          user = userElement
                        }
                      })

                      rpResolve.rows.forEach(rp => {

                        procedures.forEach(procedure => {

                          if (rp.procedure_id == procedure.id && rp.reservation_id == reservation.id) {
                            procedureArray.push(procedure);
                          }
                        })
                      })

                      list.push({
                        reservation,
                        user,
                        procedures: procedureArray
                      });
                    })

                    resolve(list);
                  }).catch(error => {

                    reject(error.message)
                  })

                }).catch(error => {
                  reject({
                    error
                  })
                })
            }
          })
        }
      })
    })
  },

  add(reservation) {

    return new Promise((resolve, reject) => {

      db.query(`INSERT INTO reservations (date,user_id)
                        VALUES (to_timestamp($1),$2)`,
        [reservation.date, reservation.user_id],
        (err, res) => {
          if (err) {
            reject(err)
          } else {


            db.query(`
                    SELECT id from reservations 
                      WHERE user_id = $1 AND date = to_timestamp($2)`,
              [reservation.user_id, reservation.date],
              (error, id) => {
                if (error) {
                  reject(error)
                } else {
                  createRp(reservation.procedures, id.rows[0].id)
                    .then(response => {
                      resolve();
                    })
                    .catch(error => {
                      reject(error)
                    })
                }

              })
          }
        })
    })
  },

  createRp(revervationId, procedures) {

    return new Promise((resolve, reject) => {

      let query = `INSERT INTO reservation_procedures (procedure_id,reservation_id) VALUES`;

      // revisar futuramente
      procedures.forEach(procedure => {

        query += `(${procedure},${revervationId}),`

      });

      // removendo a ultima virgula
      query = query.slice(0, -1);

      db.query(query, (err, res) => {

        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      })

    });


  },

  update(reservation) {

    return new Promise((resolve, reject) => {

      db.query(`
            UPDATE reservations 
              SET date= to_timestamp($1)
                WHERE id = $2 AND user_id = $3 `,
        [reservation.date, reservation.id, reservation.user_id],
        (err, res) => {
          if (err) {
            reject(err)
          } else {
            this.deleteRp(reservation.id)
              .then(response => {

                this.createRp(reservation.id, reservation.procedures)
                  .then(res => {
                    resolve();
                  })
                  .catch(error => {
                    reject(error)
                  })
              })
              .catch(error => {
                reject(error)
              })
          }
        })
    })
  },

  deleteRp(revervationId) {

    return new Promise((resolve, reject) => {

      db.query("DELETE FROM reservation_procedures WHERE reservation_id = $1",
        [revervationId],
        (err, res) => {

          if (err) {
            reject(err)
          } else {
            resolve();
          }
        })
    })
  },

  remove(reservationId) {

    // arrumar o delete com join   
    return new Promise((resolve, reject) => {

      this.deleteRp(reservationId)
        .then(response => {

          db.query(`
                  DELETE FROM reservations WHERE id = $1`,
            [reservationId],
            (err, res) => {

              if (err) {
                reject(err)
              } else {
                resolve();
              }
            })
        }).catch(error => {
          reject(error)
        })
    })
  }
}
