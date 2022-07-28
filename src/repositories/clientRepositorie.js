const db = require("../config/dbconnect");

module.exports = {

  getByid(id) {
    return new Promise((resolve, reject) => {

      try {
        db.exec(`SELECT * FROM users WHERE id = $1`, [id])
          .then(user => {
            resolve(user[0]);
          })
          .catch(e => {

            reject(e.message)
          })
      } catch {
        reject('f servidor')
      }
    });
  },

  newClient(client) {

    return new Promise((resolve, reject) => {

      try {

        db.exec(`INSERT INTO users 
                (name,email,password,phone,cpf,sexo,birth,img_url)
                  VALUES ($1,$2,$3,$4,$5,$6,to_date($7,'DDMMYYYY'),$8)`,
            [client.name,
              client.email,
              client.password,
              client.phone,
              client.cpf,
              client.sexo,
              client.birth,
              client.img_url
            ])
          .then(response => {
            resolve({
              ok: "ok"
            })
          })
          .catch(e => {
            // redirecionar para o tramento de erros
            reject(e.message)
          })

      } catch (e) {
        reject({
          error: e
        })
      }

    })

  },

  update(client) {

    return new Promise((reject, resolve) => {
      try {
        db.exec(`
                UPDATE users 
                  SET name=$1,email=$2,password=$3,phone=$4,cpf,sexo,birth,img_url
                    WHERE id=$5`,
            [client.name,
              client.email,
              client.password,
              client.phone,
              client.cpf,
              client.sexo,
              client.birth,
              client.img_url
            ])
          .then(response => {
            resolve(response);
          })
          .catch(e => {
            reject(e.message)
          })
      } catch {
        // faz algo ai bixo
        reject("f Api")
      }
    })
  },

  remove(id) {
    return new Promise((reject, resolve) => {

      try {
        db.exec(`DELETE* FROM users WHERE id = $1`, [id])
          .then(user => {
            resolve();
          })
          .catch(e => {
            reject(e.message)
          })
      } catch {
        reject('f servidor')
      }


    })
  }


}
