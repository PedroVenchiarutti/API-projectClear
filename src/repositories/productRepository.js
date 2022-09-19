const genericQuerys = require('./genericQuerys.js');
const db = require('../config/dbconnect.js');
const { newPool } = require("../config/dbconnect.js");
const Utils = require('../helpers/Utils.js');

class ProductRepository extends genericQuerys {
  static getAll = () =>
    new Promise((resolve, reject) => {
      db.exec("SELECT * FROM products order by value")
        .then((results) => resolve(results))
        .catch((error) => reject(error));
    });

  static list = (page = 1, itemsPerPage = 10) =>
    new Promise((resolve, reject) => {
      db.exec(`SELECT * from PRODUCTS ORDER BY id LIMIT $1 OFFSET $2 ROWS`, [
        +itemsPerPage,
        (+page - 1) * +itemsPerPage,
      ])
        .then((results) => resolve(results))
        .catch((error) => reject(error));
    });

  static search(param) {
    return new Promise((resolve, reject) => {
      db.exec(
        `
        SELECT * FROM products
          WHERE name LIKE '%${param}%' OR description LIKE '%${param}%' OR brand LIKE '%${param}%';`
      ).then(
        (results) => {
          resolve(results);
        },
        (e) => {

      db.exec(`
        SELECT * FROM products LIMIT 10 OFFSET $1 ORDER BY id;`, [NuPage])
        .then(products => {
          resolve(products)
        }, (e) => {
          reject(e);
          }
        );
      });
    });
  }

  static getBrands() {
    return new Promise((resolve, reject) => {
      db.exec(`SELECT DISTINCT brand FROM products`)
        .then(results => resolve(results))
        .catch(error => reject(error));
    });
  }
  
  static filter(params){

    return new Promise((resolve,reject)=>{
      
      let query = `SELECT * FROM products`;

      query += " WHERE ";

      if(params.brand.length>0 && params.brand[0]!==undefined){
        query+=" brand IN (";
        query = Utils.inIds(query,params.brand);        
      }
      
      

      if( params.from || params.to){
        if(params.brand[0]){
          query+=' AND ';  
        }
        if( params.from > 0 && params.to > 0
           && params.to > params.from){       
          query += ` value BETWEEN ${params.from} AND ${params.to}`;
        }else if(params.to > 0 || params.from > 0){
          query += params.from ? 
          `value > ${params.from}` :
          `value < ${params.to}`
        }
      }
     
      query +=" ORDER BY value"; 
      console.log(query)
      if(params.brand[0]==undefined){
      
        db.exec(query)
        .then(list => resolve(list))
        .catch(err => reject(err))
      
      }else{
        db.exec(query,params.brand)
        .then(list => resolve(list))
        .catch(err => reject(err))
        }     
    })
    
  }

  static byId(id){

    return new Promise((resolve,reject)=>{

      const pool = newPool();
      
      pool.query("SELECT * FROM products WHERE id = $1;",[id])
        .then(product=>{
          
          if(product.rows.length<=0) {
              reject({message:"Produto não encontrado."});
          }

          
          pool.query(`
            SELECT COUNT(rp.product_id) AS selled,
              (SELECT AVG(stars) FROM reviews WHERE product_id = $1) AS reviews
		            FROM request_products AS rp 
			            JOIN requests AS r ON r.id = rp.request_id
			            JOIN products AS p ON p.id = rp.product_id 
				            WHERE p.qt  > 0 AND r.status  like 'Pago%' AND p.id = $1
          `,[id]).then(info=>{
            
            const infoRows = info.rows[0];
            const productRows = product.rows[0];

            const r = Object.assign(infoRows,productRows);

            resolve(r)
          })
            .catch(e=>{
              console.log(e)
              reject(e)
            });
        })
    });
  }
}

module.exports = ProductRepository;
