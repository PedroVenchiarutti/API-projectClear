const genericQuerys = require('./genericQuerys.js');
const db = require('../config/dbconnect.js');
const {
  newPool
} = require('../config/dbconnect.js');

//`
//   SELECT 
//     request.id,
//     request.status,
//     request.product_id,
//     products.id,
//     products.name,
//     products.value
//   FROM (
//     SELECT requests.id, requests.status, request_products.product_id
//     FROM requests
//     JOIN request_products ON request_products.request_id = requests.id
//   ) as request
//   JOIN products ON products.id = request.product_id
//`;

class requestRepository extends genericQuerys {
  static getAll() {
    return new Promise((resolve, reject) => {
      const query = `
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
        JOIN users AS u ON u.id = r.user_id;
      `;

      db.exec(query)
        .then(results => {
          resolve(results)
        })
        .catch(error => reject(error));
    });
  }

  static getByUserId(userId) {
    return new Promise((resolve, reject) => {
      const query = `
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
      `;

      db.exec(query, [userId])
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }

  static getValue(id) {

    return new Promise((resolve, reject) => {

      db.exec(`
          SELECT p.value,rp.qt_product FROM request_products AS rp
            JOIN products AS p ON p.id = rp.product_id 
            JOIN requests AS r ON r.id  = rp.request_id
              WHERE rp.request_id = $1;`, [id])
        .then(productsInfo => {

          resolve(productsInfo)
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
