const db = require("../config/db/dbconnect.js");

/* 
    CRUD OPERATIONS

*/

module.exports = {
  // GET ALL DISCOUNTS
  getAll() {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM discounts`, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  }, 

  //Inserir desconto
  create(discount) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM discounts WHERE code = $1",
        [discount.code],
        (err, res) => {
          if (res.rows[0]) {
            reject("Discounts already exists");
          } else if (err) {
            reject(err);
          } else {
            db.query(
              `INSERT INTO discounts (discount,code) VALUES($1,$2)`,
              [discount.discount, discount.code],
              (err, res) => {
                if (err != null) {
                  reject(err);
                } else {
                  resolve(res.rows);
                }
              }
            );
          }
        }
      );
    });
  },

  update(discount, id) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE discounts SET discount = $1, code = $2 WHERE id = $3`,
        [discount.discount, discount.code, id],
        (err, res) => {
          if (err != null) {
            reject(err);
          } else {
            resolve(res.rows);
          }
        }
      );
    });
  },

  // Remover desconto
  //Possivelmente adicionar verificaçaõ se existe o codigo deleta se nao existi nao deleta
  delete(id) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM discounts WHERE id = $1`, [id], (err, res) => {
        if (err != null) {
          reject(err);
        } else {
          resolve(`Discount with id ${id} was deleted `);
        }
      });
    });
  },
}; // module.exports
