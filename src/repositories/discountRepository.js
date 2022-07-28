const db = require('../config/dbconnect.js');


module.exports = {


  getAll() {
    return new Promise((resolve, reject) => {
      db.exec(`SELECT * FROM discounts`)
        .then(discounts => {
          resolve(discounts)
        })
        .catch(e => {
          reject(e.message)
        })

    })
  },

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
  },

  add(discount) {
    return new Promise((resolve, reject) => {

      db.exec(`INSERT INTO discounts (discount,code,dt_limit) VALUES($1,$2,to_timestamp($3))`,
          [discount.discount, discount.code, discount.dt_limit])
        .then(response => {
          resolve('ok')
        }).catch(err => {
          reject(err)
        })
    })
  },

  update(discount) {

    return new Promise((resolve, reject) => {
      db.exec(`UPDATE discounts SET discount = $1, code = $2, dt_limit = $3 WHERE id = $4`,
          [discount.discount, discount.code, discount.dt_limit, discount.id])
        .then(response => {
          resolve.send()
        })
        .catch(e => {
          reject(e.message)
        })
    })
  },

  remove(id) {

    return new Promise((resolve, reject) => {
      db.exec(`DELETE FROM discounts WHERE id = $1`,
          [id])
        .then(response => {
          res.sen(response)
        })
        .catch(e => {
          res.send(e.message)
        })
    })
  },
}
