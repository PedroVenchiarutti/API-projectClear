const db = require("../config/db/dbconnect.js");

module.exports = {
 
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
  
  add(product){

    return new Promise((resolve,reject)=>{

        db.query(`INSERT INTO products 
          (name,  value,description,qt)
          VALUES ($1,$2,$3,$4)`,
          [product.name,
           product.value,
           product.description,
           product.qt],(err,res)=>{

            if(err != null)
              reject(err);
            else{
              resolve(true);
            }
          })

      })
  },

  update(product){

    db.query(`UPDATE products 
                SET name=$1,value=$2,description=$3,qt=$4`,
                [product.name,
                  product.values,
                  product.description,
                  product.qt],(err,res)=>{

      if(err!=null){
        reject(err)
      } else{
        resolve(true);
      }
     })
  },

  remove(id){

    db.query("DELETE FROM products WHERE id = $1",[id],(err,res)=>{
      if(err != null){
        reject(err)
      } else{
        resolve(true)
      }
    })
  }
}
