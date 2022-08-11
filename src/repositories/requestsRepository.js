const genericQuerys = require('./genericQuerys.js');
const db = require('../config/dbconnect.js');
const {
  newPool
} = require('../config/dbconnect.js');

class requestRepository extends genericQuerys {

  static getAll(id = "") {

    return new Promise((resolve, reject) => {

      // adicionar endereco depois de popular a tabela
      const query = id ? ` 
        SELECT r.id ,r.status,u."name" , (
	        SELECT jsonb_agg(pr) 
		        FROM (
			        SELECT rp.qt_product,p."name" ,p.value,p.id AS "productId" 
				        FROM request_products AS rp
			          	JOIN products AS p ON p.id = rp.product_id
			                WHERE rp.request_id = r.id
		            ) AS pr
            ) AS "products"
          FROM requests AS r
      JOIN users AS u ON u.id = r.user_id 
      WHERE r.user_id = $1
      ` : `
      SELECT r.id ,r.status,u."name" , (
        	SELECT jsonb_agg(pr) 
		        FROM (
			        SELECT rp.qt_product,p."name" ,p.value,p.id AS "productId" 
				        FROM request_products AS rp
				          JOIN products AS p ON p.id = rp.product_id
			          WHERE rp.request_id = r.id
		          ) AS pr
            ) AS "products"
          FROM requests AS r
        JOIN users AS u ON u.id = r.user_id;`
      console.log(query)
      db.exec(query, [id])
        .then(res => {
          resolve(res);
        }, (e) => {
          reject(e)
        })
    })
  }

  static insert(request) {

    return new Promise((resolve, reject) => {

      const pool = newPool();
      
      
      let query = `INSERT INTO request_products (request_id,product_id,qt_product) VALUES`;

      // revisar futuramente
      request.products.forEach(product => {

        query += `((SELECT id FROM requests
            WHERE user_id = ${request.user_id} AND date = to_timestamp(${request.date})),${product.id},${product.qt}),`
      });

      // removendo a ultima virgula
      query = query.slice(0, -1);
      
      console.log(query);
      
      pool.query(`
        INSERT INTO requests (user_id,date,status,address_id) 
          VALUES ($1,to_timestamp($2),$3,$4); `,
          [request.user_id, request.date, "Pendente", request.id])
        .then(results => {

          pool.query(query).then(ok => {
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
    pool.end();
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
