const db = require("../config/db/dbconnect.js");

/* 
    CRUD OPERATIONS
*/

// GET ALL DISCOUNTS
exports.getAll = (req, res) => {
  /**
  #swagger.tags = ['discount']
  #swagger.summary="busca todos os cupons de discontos"
 */

  try {
    db.exec(`SELECT * FROM discounts`)
      .then(discounts => {
        res.send(discounts)
      })
      .catch(e => {
        res.send(e.message)
      })

  } catch {
    res.send('f api')
  }
}

// discount/code
exports.getByCode = (req, res) => {

  try {
    db.exec('SELECT discount FROM discounts WHERE code = $1',
        [discount.code])
      .then(discount => {
        res.send(discount);
      })
      .catch(e => {
        res.send(e.message)
      })
  } catch {
    res.send('f api')
  }
}

//Inserir desconto
exports.add = (req, res) => {
  /**
    #swagger.tags = ['discount']
    #swagger.summary="Cria um novo cupon de disconto"
    #swagger.parameters[''] => {
      in:"body",
      description:"modelo de dados do Cupon de disconto",
      schema:{
        $disocunt:50,
        $code:"AUAU",
        dt_limit:1658762344027
      }
  }
 */

  try {

    const discount = req.body;
    db.exec(`INSERT INTO discounts (discount,code,dt_limit) VALUES($1,$2,to_timestamp($3))`,
        [discount.discount, discount.code, discount.dt_limit])
      .then(response => {
        res.send('ok')
      })
  } catch {

  }

}

exports.update = (req, res) => {
  /**
    #swagger.tags = ['discount']
    #swagger.summary="Atualiza um novo cupon de disconto"
    #swagger.parameters[''] => {
      in:"body",
      description:"modelo de dados do Cupon de disconto",
      schema:{
        $disocunt:50,
        $code:"AUAU",
        dt_limit:1658762344027
      }
  }
 */

  try {

    const discount = req.body;

    db.exec(`UPDATE discounts SET discount = $1, code = $2, dt_limit = $3 WHERE id = $4`,
        [discount.discount, discount.code, discount.dt_limit, discount.id])
      .then(response => {
        res.send()
      })
      .catch(e => {
        res.send(e.message)
      })

  } catch {
    res.send('f api')
  }

}
// Remover desconto

exports.remove = (req, res) => {
  /**
      #swagger.tags = ['discount']
      #swagger.summary="Remove o cupon de disconto"
      #swagger.parameters['id'] => {
        in:"path",
    }
   */


  try {
    db.exec(`DELETE FROM discounts WHERE id = $1`,
        [req.params.ids])
      .then(response => {
        res.sen(response)
      })
      .catch(e => {
        res.send(e.message)
      })
  } catch {
    res.send('f api')
  }
}
