const db = require('../config/dbconnect.js');


module.exports = {

  getAll() {
    return new Promise((resolve, reject) => {
      db.exec(`SELECT * FROM "procedures"`)
        .then(procedures => {
          res.send(procedures)
        })
        .catch(e => res.send(e.message))
    })
  },
  add(procedure) {
    return new Promise((resolve, reject) => {
      db.exec(`INSERT INTO procedures(name,value,categorie) VALUES($1,$2,$3)`,
          [procedure.name, procedure.value, procedure.categorie])
        .then(response => {
          res.send(response)
        })
        .catch(e => res.send(e.message))

    })
  },
  update(procedure) {
    return new Promise((resolve, reject) => {
      db.exec(`
        UPDATE procedures 
          SET name = $1, value = $2, categorie = $3
             WHERE id = $4`,
          [procedure.name, procedure.value, procedure.categorie, id])
        .then(reponse => {
          res.send(response)
        })
        .catch(e => {
          res.send(e.message)
        })


    })
  },
  remove(id) {
    return new Promise((resolve, reject) => {
      db.exec(`DELETE FROM procedures WHERE id = $1`,
          [id])
        .then(response => {
          res.send()
        })
        .catch(e => {
          res.send(e.message)
        })

    })
  },

}
