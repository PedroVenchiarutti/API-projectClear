const db = require("../config/db/dbconnect.js");

module.exports = {

  //parse int 
  getProduct(id){
    
    return new Promise((resolve,reject)=>{
      db.query(`SELECT * FROM products WHERE id= $1`,[id],(err,res)=>{

        if(err !=null){
          reject(err)
        }
        else{
          resolve(res.rows[0]);
        }
      })
    }  
  )},

  // search lists
  getProductList(nLimit, categorie=null){

    return new Promise((resolve,reject)=>{
      const query = categorie ? 
        "SELECT * FROM products WHERE categorie = $2 LIMIT $1.$2" :
        "SELECT * FROM products LIMIT $1. $2";

      const params = categorie ? 
        [nLimit,(nLimit+10),categorie]:
        [nLimit,(nLimit+10)]

      db.query(query,params,(err,res)=>{

        if(err !=null){
          reject(err)
        }
        else{
          resolve(res.rows);
        }
      })
    }  
  )}
}
