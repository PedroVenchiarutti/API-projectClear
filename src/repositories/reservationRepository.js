const db = require('../config/dbconnect.js');
const genericQuerys = require('./genericQuerys.js');
const utils = require('../helpers/Utils.js');

class reservationRepository extends genericQuerys{

  static getAll(){

  }

  // ids = []
  static getReservation_procedures(ids) {

    return new Promise((resolve, reject) => {

      let query = `
        SELECT * FROM reservation_procedures
          WHERE reservation_id IN (`;

      query = utils.inIds(query, ids);

      db.exec(query, ids)
        .then(rp => {
          resolve(rp);
        }, (e) => {
          reject(e.message)
        })
    });
  }
  
  static add(userId, date) {

    return new Promise((resolve, reject) => {

      db.exec(`
        INSERT INTO reservations (user_id,"date")
          VALUES($1,$2)`,
          [userId, date])
        .then(results => {

          db.exec(`
              SELECT id FROM reservations 
                WHERE user_id = $1 AND "date" = $2
            `, [userId, date])
            .then(results => {
              resolve(results);
            }, (e) => {

              reject(e)
            })
        })
    })
  }

  static addReservationProcedures(reservationId, procedures) {

    return new Promise((resolve, reject) => {

      let query = `INSERT INTO reservation_procedures (procedure_id,reservation_id) VALUES`;

      // revisar futuramente
      procedures.forEach(procedure => {

        query += `(${procedure},${reservationId}),`

      });

      // removendo a ultima virgula
      query = query.slice(0, -1);
      console.log(query)

      db.exec(query)
        .then(res => {
          resolve(res);
        }, (e) => {
          reject();
        })
    })
  }

  static refreshReservation(reservationId, procedures) {

    console.log(reservationId)
    
    return new Promise((resolve, reject) => {

      genericQuerys.deleteTable("reservation_procedures",reservationId, "reservation_id")
        .then(res => {

          this.addReservationProcedures(reservationId, procedures)
            .then(results => {
              resolve();
            }, (e) => {
              console.log(e.message)
              reject(e)
            })
        

        }, (e) => {
          console.log(e.message)
          reject(e);
        })
    })
  }
}

module.exports = reservationRepository;
