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
      `:`
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
  
  static add(procedures){
    
    return new Promise((resolve,reject)=>{
    
      const pool = newPool();

        
    });
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
