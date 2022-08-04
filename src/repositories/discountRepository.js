const db = require('../config/dbconnect.js');
const genericQuerys = require('./genericQuerys.js');

class dicsountsRepository extends genericQuerys {

  static getByCode(code) {

    return new Promise((resolve, reject) => {
      db.exec(`SELECT * FROM discounts WHERE code = $1`,
          [code])
        .then(discounts => {
          resolve(discounts)
        })
        .catch(e => {
          reject(e.message)
        })

    })
  }
}

module.exports = dicsountsRepository;
