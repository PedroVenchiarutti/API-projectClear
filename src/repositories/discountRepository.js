const db = require('../config/dbconnect.js');


module.exports = {

  getByCode(code) {

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
