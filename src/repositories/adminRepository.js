const db = require('../config/dbconnect.js');
const genericQuerys = require('./genericQuerys.js');

class AdminRepository extends genericQuerys {

  /*
   * qt Usuarios
   * qt Reservas
   * qt cupons 
   * qt Pedidos
   * 
   * --------------
   * 
   * qt pedidos Mes
   * qt Produtos vendidos mes
   * nm produto mais vendido
   * qt vl mensal
   * qt valor total
   * */

  static getByLogin = (email, password) => new Promise((resolve, reject) => {
    db.exec(`SELECT * FROM adms WHERE email = $1 AND password = $2`, [email, password])
      .then(results => resolve(results[0]))
      .catch(error => reject(error))
  });

  static dashboard() {

    return new Promise((resolve, reject) => {

      db.exec(`
        SELECT 
          (SELECT COUNT(*) FROM reservations) AS "reservations", 
          (SELECT COUNT(*) FROM discounts) AS "discounts",
          (SELECT COUNT(*) FROM requests ) AS "requests",
          (SELECT COUNT(*) FROM users) AS "users";`)
        .then(data => {
          resolve(data);
        }, (e) => {
          reject(e)
        })
    })
  }
}

module.exports = AdminRepository;
