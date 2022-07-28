
const db = require('../config/dbconnect.js');
const utils = require('../helpers/Utils.js');


module.exports ={

  SelectAll(table){

    return new Promise((resolve,reject)=>{
        
      db.exec(`SELECT * FROM ${table}`)
        .then(results=>{
            resolve(results);
        })
        .catch(err=>{
          reject(err);
        })
    })
  },
  
  insertTable(table, params){

    return new Promise((resolve,reject)=>{
      
      let query = `INSERT INTO ${table} (`

      const keys = Object.keys(params);

      keys.forEach(key=>{
       query =+ `${key},`
      })
      
      query.slice(0,-1);

      query+=" VALUES("

      query = Utils.inIds(query,keys)

      console.log(query)
    })
  },
  
  updateTable(table,params){

    return new Promise((resolve,reject)=>{

    })
  
  },
 
  deleteTable(table,id){

    return new Promise((resolve,reject)=>{
        
      db.exec(`DELETE FROM ${table} WHERE id = $1`,[id])
        .then(response=>{
          resolve()
        })
        .catch(err=>{
          reject(err);
        })
    })
  },

}
