const {
  newPool
} = require('../config/dbconnect.js');
const cripto = require('../config/bcrypt.js');

const login = (email, password) => {

  return new Promise((resolve, reject) => {

    const pool = newPool();

    pool.query(`
      SELECT * FROM adms 
          WHERE email = $1`, [email])
      .then(adm => {

        if (adm.rows.length != 0) {
          cripto.verifyPassword(password, adm.rows[0].password)
            .then(resp => {

              if (resp === true) 
                resolve({
                  "adm":true,
                  "info":adm.rows[0]
                });

              else {
                pool.query(`
                    SELECT * FROM users 
                      WHERE email = $1`, [email])
                  .then(client => {

                    if (client.rows.length == 0) {
                      reject({
                        message: "Usuario não encontrado"
                      });
                    } else {

                      if (client.rows.length != 0) {

                        cripto.verifyPassword(password, client.rows[0].password)
                          .then(result => {
                            if (result) 
                              resolve({
                                "adm":false,
                                "info":client.rows[0]
                              });

                            else reject({
                              message: "Senhas diferentes"
                            })
                          })
                      }
                    }
                  }, (e) => {
                    reject(e);
                  })
              }
            }, (e) => {
              reject(e)
            })
        }
      })
  })
  pool.end();
}
module.exports = login;
