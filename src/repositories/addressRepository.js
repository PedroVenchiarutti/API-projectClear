const genericQuerys = require('./genericQuerys.js');
const db = require('../config/dbconnect.js');

class AddressRepository extends genericQuerys {


  static getAllUser(user_id) {

    return new Promise((resolve, reject) => {

      db.exec(`
          SELECT * FROM addresses WHERE user_id = $1`,
        [user_id])
        .then(addresses => {
          console.log(addresses);
          resolve(addresses)
        }, (e) => {

          reject(e);
        })

    })
  }

  static getByAddressIdAndUserId(addressId, userId) {
    return new Promise((resolve, reject) => {
      db.exec(`SELECT * FROM addresses WHERE id = $1 AND user_id = $2`, [addressId, userId])
        .then(results => resolve(results[0]))
        .catch(error => reject(error))
    })
  }
}

module.exports = AddressRepository;
