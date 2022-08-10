const {newPool} = require('../config/dbconnect.js');

const login = (email, password) => {

  return new Promise((resolve, reject) => {

    const pool = newPool();

    pool.query(`
      SELECT * FROM adms 
          WHERE email = $1 AND password = $2`, [email, password])
      .then(adm => {

        if (adm.rows.length != 0) {

          const json = {
            "adm": adm.rows[0],
          }
          resolve(adm.rows[0])

        } else {
          pool.query(`
            SELECT * FROM users 
              WHERE email = $1 AND password = $2`, [email, password])
            .then(client => {

              if (client.rows.length == 0) {
                reject({
                  message: "Usuario não encontrado"
                });
              } else {

                const json = {
                  "client": client.rows[0],
                }

                resolve(json);
              }
            }, (e) => {
              reject(e);
            })
        }
      }, (e) => {
        reject(e);
      })
  })

  pool.end();
}
module.exports = login;
