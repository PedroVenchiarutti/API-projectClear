const db = require("../config/dbconnect");

module.exports = {


  //login(){},

  getAll() {
    return new Promise((resolve, reject) => {
      console.log("aqui")
      db.exec("SELECT * FROM adms")
        .then(adms => {
          resolve(adms);
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  add(adm) {

    return new Promise((resolve, reject) => {
      // validar campos futuramente
      db.exec(`
              INSERT INTO adms (name,email,password) 
                  VALUES ($1,$2,$3)`,
          [adm.namee, adm.email, adm.password])
        .then(response => {
          resolve()
        })
        .catch(e => {
          reject(e)
        })

    })
  },

  update(adm) {

    return new Promise((resolve, reject) => {

      db.exec(`UPDATE adms 
          SET name=$1, email=$2, password=$3
              WHERE id = $4`,
          [adm.name, amd.email, adm.password])
        .then(response => {
          resolve();
        })
        .catch(e => {
          reject(e)
        })

    })

  },

  remove(id) {

    return new Promise((resove, reject) => {

      db.exec("DELETE FROM adms WHERE id = $1", [id])
        .then(response => {
          resolve();
        })
        .catch(e => {
          reject(e.message)
        })
    })
  },
}
