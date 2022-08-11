const db = require('../config/dbconnect.js');
const genericQuerys = require('./genericQuerys.js');
const {
  newPool
} = require('../config/dbconnect.js');

class reservationRepository extends genericQuerys {

  static getAll(id = "") {

    return new Promise((resolve, reject) => {

      const query = id ? ` 
         SELECT r.id ,r.date,u."name" , (
	        SELECT jsonb_agg(pr) 
		        FROM (
			        select p.id, p.name,p.value,p.categorie 
			        	from reservation_procedures as rp 
			        		join "procedures" as p on p.id = rp.procedure_id  
			        			where rp.reservation_id  = r.id 
		            ) AS pr
            ) AS "products"
          FROM reservations AS r
      JOIN users AS u ON u.id = r.user_id 
      WHERE r.user_id = $1;
      ` : `
        SELECT r.id ,r.date,u."name" , (
	        SELECT jsonb_agg(pr) 
		        FROM (
			        select p.id, p.name,p.value,p.categorie 
			        	from reservation_procedures as rp 
			        		join "procedures" as p on p.id = rp.procedure_id  
			        			where rp.reservation_id  = r.id 
		            ) AS pr
            ) AS "products"
          FROM reservations AS r
        JOIN users AS u ON u.id = r.user_id 
      `;
      db.exec(query)
        .then(res => {
          resolve(res);
        }, (e) => {
          reject(e)
        })
    })
  }


  static add(reservation) {

    return new Promise((resolve, reject) => {

      db.exec(`
        INSERT INTO reservation (date,user_id) 
          VALUES (to_timestamp($1),$2)`,
          [reservation.date, reservation.user_id])
        .then(res => {
          this.addRp(reservation.procedures, reservation.date, reservation.user_id)
            .then(respose => {
              resolve();
            }, (e) => {
              reject(e);
            })
        }, (e) => {
          reject(e);
        })
    })

  }

  static addRp(procedures, date, user_id) {

    return new Promise((resolve, reject) => {

      let query = `INSERT INTO reseravtion_procedures (reservation_id,procedure_id) VALUES`;

      // revisar futuramente
      procedures.forEach(procedure => {

        query += `((SELECT id FROM reservation
            WHERE user_id = ${user_id} AND date = to_timestamp(${date})),${procedure}),`
      });

      query = query.slice(0, -1);

      db.exec(query)
        .then(res => {
          resolve(res)
        }, (e) => {
          reject(e)
        })
    });
  }

  static update(reservation, id) {

    return new Promise((resolve, reject) => {

      db.exec(`
          UPDATE TABLE reservations 
            SET date = to_timestamp($1), user_id = $2`,
          [reservation.date, reservation.user_id])
        .then(resp => {

          this.deleteTable("reservation_procedures", id, "reservation_id")
            .then(resp => {

              this.addRp(reservation.procedures)
                .then(res => {
                  resolve();
                }, (e) => {
                  reject(e);
                })
            }, (e) => {
              reject(e)
            })
        }, (e) => {
          reject(e)
        })
    })
  }
}

module.exports = reservationRepository;
