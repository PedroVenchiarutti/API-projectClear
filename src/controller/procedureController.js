const db = require('../config/db/dbconnect');
const Utils = require('../Utils/Utils');


// seleciona a partir de um array de ids
exports.getById = (req, res) => {

  return Utils.selectMultiID('Procedures', ids)
}

exports.getAll = (req, res) => {
  /**
     #swagger.tags = ['procedure']
     #swagger.summary="Busca todos os procedimentos cadastrados."
  */
  try {

    db.exec(`SELECT * FROM "procedures"`)
      .then(procedures => {
        res.send(procedures)
      })
      .catch(e => res.send(e.message))
  } catch {}
}

exports.add = (req, res) => {

  /**
      #swagger.tags = ['procedure']
      #swagger.summary="Adiciona um procedimento"
      #swagger.parameters['procedure'] => {
        in:"body",
        description:"modelo de dados dos Procedimentos",
        schema:{
          $name:"Corte de cabelo",
          $value:35.00,
          $categorie:"corte"
        }
    }
   */

  try {

    db.exec(`INSERT INTO procedures(name,value,categorie) VALUES($1,$2,$3)`,
      [procedure.name, procedure.value, procedure.categorie])
  .then(response => {
      res.send(response)
    })
    .catch(e => res.send(e.message))
}
catch {}
}

exports.update = (req, res) => {
  /**
      #swagger.tags = ['procedure']
      #swagger.summary="Atualiza um procedimento"
      #swagger.parameters['procedure'] => {
        in:"body",
        description:"modelo de dados dos Procedimentos",
        schema:{
          $name:"Corte de cabelo",
          $value:35.00,
          $categorie:"corte"
        }
    }
   */

  try {
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

} catch {}
}


exports.remove = (req, res) => {
  /**
      #swagger.tags = ['procedure']
      #swagger.summary="Remove um procedimento"
      #swagger.parameters['id'] => {
        in:"path",
    }
   */
  try {

    db.exec(`DELETE FROM procedures WHERE id = $1`,
      [id])
  .then(response => {
      res.send()
    })
    .catch(e => {
      res.send(e.message)
    })
}
catch {

}
}
