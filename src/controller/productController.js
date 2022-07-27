const db = require("../config/db/dbconnect.js");

/*
// search lists
getProductList(nLimit, categorie=null){
  return new Promise((resolve,reject)=>{
   
    // paginacao futura

    const query = categorie ? 
      "SELECT * FROM products WHERE categorie = $2 LIMIT $1 OFFSET $2" :
      "SELECT * FROM products LIMIT $1  OFFSET $2";

    const params = categorie ? 
      [nLimit,(nLimit+10),categorie]:
      [10,0]
    
    db.query(query,params,(err,res)=>{

      if(err !=null){
        reject(err)
      }
      else{
        resolve(res.rows);
      }
    })
  }  
)},
*/

exports.getAll = (req, res) => {
  /**
    #swagger.tags = ['product']
    #swagger.summary="Lista todos os produtos"
   */
  try {
    db.exec(`SELECT * FROM products`)
      .then(products => {
        res.send(products)
      })
      .catch(e => {
        res.send(e.message)
      })
  } catch {

  }
}

exports.getById = (req, res) => {
  try {
    const id = req.params.id;
    db.exec('SELECT * FROM products WHERE id = $1', [id])
      .then(product => {
        res.send(product)
      })
      .catch(e => {
        res.send(e.message)
      })
  } catch {

  }
}

exports.add = (req, res) => {
  /**
    #swagger.tags = ['product']
    #swagger.summary="Adiciona um produto no bando de dados"
    #swagger.parameters['product'] => {
      in: "body",
      description: "modelo de Produto a ser enviado",
      schema:{
        $nome:"Creme para pentear",
        $value:45.80,
        $description:"loren ipsum....",
        $qt:67,
        $brand:"avon"
      }
    }
   */
  try {
    const product = req.body;

    db.exec(
        `INSERT INTO products 
          (name,value,description,qt,brand)
          VALUES ($1,$2,$3,$4)`,
        [product.name,
          product.value,
          product.description,
          product.qt,
          product.brand
        ])
      .then(reponse => {
        res.send(response)
      })
      .catch(e => res.send(e.message))


  } catch {}
}

exports.update = (req, res) => {
  /**
    #swagger.tags = ['product']
    #swagger.summary="Atualizacao dos dados de um produto"
    #swagger.parameters['product'] => {
      in:"body",
      description:"modelo de Produto a ser enviado",
      schema:{
        $nome:"Creme para pentear",
        $value:45.80,
        $description:"loren ipsum....",
        $qt:67,
        $brand:"avon"
      }
    }
   */
  try {
    const product = req.body;
    db.exec(`UPDATE products 
                SET name=$1,value=$2,description=$3,qt=$4,brand=$5 WHERE id = $6`,
        [product.name,
          product.values,
          product.description,
          product.qt,
          product.brand,
          product.id
        ])
      .then(response => {
        res.send("ok")
      })
      .catch(e => {
        res.send(e.message)
      })

  } catch {}
}

exports.remove = (req, res) => {
  /**
    #swagger.tags = ['product']
    #swagger.summary="Remove um produto do banco de dados"
    #swagger.parameters['id'] => {
      in:"path",
      description:"Codigo identificador do produto",
      type:"intenger"
    }
   */
  try {
    const id = req.params.id;

    db.exec("DELETE FROM products WHERE id = $1", [id])
      .then(response => {
        res.send(repsonse)
      })
      .catch(e => {
        res.send(e.message)
      })
  } catch {

  }
}
