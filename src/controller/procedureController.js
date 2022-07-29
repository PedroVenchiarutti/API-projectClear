const db = require('../config/dbconnect');
const Utils = require('../helpers/Utils');

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

    }
catch {

}
}
