const genericQuerys = require('./genericQuerys.js');
const {
  newPool
} = require('../config/dbconnect.js');
const Utils = require('../helpers/Utils.js');

class requestRepository extends genericQuerys {

  static getAll(id = null) {

    return new Promise((resolve, reject) => {

      const pool = newPool();

      const queryReq = id ?
        `SELECT r.id,u.name,r.date 
          FROM requests AS r
            JOIN users AS u ON u.id = r.user_id WHERE u.id = ${id}` :
        `SELECT r.id,u.name,r.date 
            FROM requests AS r
              JOIN users AS u ON u.id = r.user_id`;

      pool.query(queryReq)
        .then(requests => {

          pool.query('SELECT * FROM request_products')
            .then(rp => {

              const productsId = Utils.resJsonToArray(rp.rows, "product_id");

              let query = `SELECT * FROM products WHERE id IN (`;
              query = Utils.inIds(query, productsId);

              console.log(query)
              pool.query(query, productsId)
                .then(products => {

                  const req = requests.rows;
                  const reqPro = rp.rows;
                  const prod = products.rows

                  resolve({
                    requests: req,
                    request_produsts: reqPro,
                    products: prod
                  })
                  pool.end();
                }, (e) => {
                  reject(e)
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
module.exports = requestRepository;
