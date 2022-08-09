const genericQuerys = require('./genericQuerys.js');
const db = require('../config/dbconnect.js');

class ProductRepository extends genericQuerys{

  static list(NuPage){
    console.log(NuPage)
    return new Promise((resolve,reject)=>{

      db.exec(`
        SELECT * FROM products LIMIT 10 OFFSET $1;`,[NuPage])
        .then(products=>{
          resolve(products)
        },(e)=>{
          reject(e);
        })
    });
  }
}

module.exports = ProductRepository;
