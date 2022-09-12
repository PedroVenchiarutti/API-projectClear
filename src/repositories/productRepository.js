const genericQuerys = require('./genericQuerys.js');
const db = require('../config/dbconnect.js');

class ProductRepository extends genericQuerys {
  static getAll = () => new Promise((resolve, reject) => {
    db.exec("SELECT * FROM products").then(results => resolve(results)).catch(error => reject(error));
  });

  static list = (page = 1, itemsPerPage = 10) => new Promise((resolve, reject) => {
    db.exec(`SELECT * from PRODUCTS ORDER BY id LIMIT $1 OFFSET $2 ROWS`, [+itemsPerPage, (+page - 1) * +itemsPerPage])
      .then(results => resolve(results))
      .catch(error => reject(error));
  })

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
