const genericQuerys = require('./genericQuerys.js');
const db = require('../config/dbconnect.js');

class AddressRepository extends genericQuerys {


  static getAllUser(user_id){

      return new Promise((resolve,reject)=>{

        db.exec(`
          SELECT * FROM addresses WHERE user_id = $1`,
          [user_id])
          .then(addresses=>{
            resolve(addresses)
          },(e)=>{

            reject(e);
          })

      })
  }
}

module.exports = AddressRepository;
