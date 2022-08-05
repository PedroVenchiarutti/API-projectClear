const genericQuerys = require('./genericQuerys.js');
const db = require('../config/dbconnect.js');
const {
  newPool
} = require('../config/dbconnect.js');

class requestRepository extends genericQuerys {

  static getAll(id = "") {

    return new Promise((resolve, reject) => {

      const query = id ? ` 
        SELECT rp.id,rp.product_id,rp.request_id,rp.qt_product, u."name" AS "clientName", p.name AS "productName" 
          FROM request_products AS rp
	          JOIN requests AS r ON r.id = rp.request_id 
	          JOIN products AS p ON p.id = rp.product_id 
            JOIN users AS U ON u.id = r.id
              WHERE u.id = ${id}` :
        `SELECT rp.id,rp.product_id,rp.request_id,rp.qt_product, u."name" AS "clientName", p.name AS "productName" 
          FROM request_products AS rp
	          JOIN requests AS r ON r.id = rp.request_id 
	          JOIN products AS p ON p.id = rp.product_id 
	          JOIN users AS U ON u.id = r.id; `
      db.exec(query)
        .then(res => {
          resolve(res);
        }, (e) => {
          reject(e)
        })
    })
  }
  
  static insert(request,products){

    return new Promise((resolve,reject)=>{

      const pool = newPool();
      
    })
  }
  
  static remove(id) {

    return new Promise((resolve, reject) => {

      const pool = newPool();

      pool.query(`
        DELETE FROM request_products WHERE request_id = $1`, [id])
        .then(del => {
          pool.query(`
            DELETE FROM requests WHERE id = $1`, [id])
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
module.exports = requestRepository;
