const db = require('../config/dbconnect.js');
const genericQuerys = require('./genericQuerys.js');
const {
  newPool
} = require('../config/dbconnect.js');

class reservationRepository extends genericQuerys {

  static getAll(id = "") {

    return new Promise((resolve, reject) => {

      const query = id ? ` 
        SELECT rp.id,rp.procedure_id ,rp.reservation_id ,r."date",u.name as "clientName", p."name" as "productName" 
          FROM reservation_procedures AS rp
	          JOIN reservations AS r ON r.id = rp.reservation_id
	          JOIN users AS u ON u.id = r.user_id
            JOIN "procedures" AS p ON p.id = rp.procedure_id
              WHERE u.id = ${id};`:
        `SELECT rp.id,rp.procedure_id ,rp.reservation_id ,r."date",u.name as "clientName", p."name" as "productName" 
          FROM reservation_procedures as rp
	          JOIN reservations AS r ON r.id = rp.reservation_id
	          JOIN users AS u ON u.id = r.user_id
            JOIN "procedures" AS p ON p.id = rp.procedure_id;`
      db.exec(query)
        .then(res => {
          resolve(res);
        }, (e) => {
          reject(e)
        })
    })
  }

  static remove(id) {

    return new Promise((resolve, reject) => {

      const pool = newPool();

      pool.query(`
        DELETE FROM reservation_procedures WHERE reservation_id = $1`, [id])
        .then(del => {
          pool.query(`
            DELETE FROM reservation WHERE id = $1`, [id])
            .then(delR => {
              resolve();
              pool.end();
            }, (e) => {
              reject(e);
            })
        }, (e) => {
          reject(e)
        })
    })
  }
}

module.exports = reservationRepository;
