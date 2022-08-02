const db = require('../config/dbconnect.js');
const genericQuerys = require('./genericQuerys.js');
const utils = require('../helpers/Utils.js');

module.exports = {

  // ids = []
  getReservation_procedures(ids) {

    return new Promise((resolve, reject) => {

      let query = `
        SELECT * FROM reservation_procedures
          WHERE reservation_id IN (`;


      query = utils.inIds(query, ids);
      
      db.exec(query, ids)
        .then(rp => {
          resolve(rp);
        }, (e) => {
          reject(e.message)
        })
    });
  },

  getReservationsUserId(userId) {
    return new Promise((resolve, reject) => {

      if (userId < 1) {
        reject();
      }


    })
  }
}
