const genericQuerys = require('./genericQuerys.js');
const db = require('../config/dbconnect.js');

class ProductRepository extends genericQuerys {

  static list(NuPage) {

    return new Promise((resolve, reject) => {

      db.exec(`
        SELECT * FROM products LIMIT 10 OFFSET $1;`, [NuPage])
        .then(products => {
          resolve(products)
        }, (e) => {
          reject(e);
        })
    });
  }

  static search(param) {

    return new Promise((resolve, reject) => {

      db.exec(`
        SELECT * FROM products
          WHERE name LIKE '%${param}%' OR description LIKE '%${param}%' OR brand LIKE '%${param}%';`)
        .then(results => {
          resolve(results)
        }, (e) => {
          reject(e);
        })
    });
  }
}

module.exports = ProductRepository;
