const db = require("../config/dbconnect.js");
const genericQuerys = require('../repositories/genericQuerys');
const validate = require('../middlewares/validationMiddleware.js');
const schema = require('../validations/productValidation.js');
const apiError = require('../error/apiError.js');

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

exports.getAll = (req, res, next) => {
  /**
    #swagger.tags = ['product']
    #swagger.summary="Lista todos os produtos"
   */

  genericQuerys.select("products")
    .then(products => {
      res.send(products);
    }, (e) => {
      next(apiError.badRequest(e.message))
    })
}

exports.getById = (req, res, next) => {
  /**
   #swagger.tags = ['product']
   #swagger.summary="Lista todos os produtos"
  */

  const id = req.params.id;

  genericQuerys.select("products", id)
    .then(product => {
      res.send(product);
    }, (e) => {
      next(apiError.badRequest(e.message))
    })

}

exports.add = validate(schema), (req, res, next) => {
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

  const product = req.body;

  genericQuerys.insertTable("products", prodcut)
    .then(response => {
      res.send();
    }, (e) => {
      next(apiError.badRequest(e.message))
    })
}

exports.update = validate(schema), (req, res, next) => {

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

  const product = req.body;

  genericQuerys.updateTable("products", product)
    .then(response => {
      res.send()
    }, (e) => {
      next(apiError.badRequest(e.message))
    })
}

exports.remove = (req, res, next) => {
  /**
    #swagger.tags = ['product']
    #swagger.summary="Remove um produto do banco de dados"
    #swagger.parameters['id'] => {
      in:"path",
      description:"Codigo identificador do produto",
      type:"intenger"
    }
   */

  const id = req.params.id;

  genericQuerys.deleteTable('products', id)
    .then(response => {
      res.send();
    }, (e) => {
      next(apiError.badRequest(e.message))
    })

}
