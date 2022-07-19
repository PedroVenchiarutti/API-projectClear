const db = require('../config/db/dbconnect.js');

module.exports = {

  login(email,password){
    return new Promise((resolve,reject)=>{
      db.query("SELECT name,email FROM adms WHERE email = $1, password = $2 ",
        [email,password],(err,res)=>{

          if(err != null){
            reject(err);
          }
          else{
            resolve(res.rows[0]);
          }
        });
    }
  )},

  getAll(){
   
    return new Promise((resolve,reject)=>{
      db.query("SELECT * FROM adms",(err,res)=>{

        if(err != null){
          reject(err)
        }
        else{
          resolve(res.rows)
        }
      })    ;
    })
  },

  get(id){
      return new Promise((resolve,reject=>{
        db.query("SELECT * FROM adms WHERE id = $1", [id],(err,res)=>{
          if(err!= null){
            reject(err)
          }else{
            resolve(res.rows)
          }
        })
        
      }))
  },

  /* {
   *  name,
   *  email,
   *  password
   *  }
   */

  add(adm){ 
    return new Promise((resolve,reject)=>{
        db.query("SELECT * FROM adms WHERE email = $1", [adm.email],(err,res)=>{
          if(res.rows[0].email){
            reject("Email already exists")
          }else if(err){
            reject(err)
          }else {
            db.query("INSERT INTO adms(name,email,password) VALUES($1,$2,$3)",[adm.name,adm.email,adm.password],(err,res) =>{
              if(err != null){
                reject(err)
              }else {
                resolve("Usuario adicionado com sucesso")
              }
          })
    }})
    })
  },

  update(adm){

    return new Promise((resolve,reject)=>{

      db.query(`UPDATE adms 
                  SET name=$1, email=$2 password=$3
                    WHERE id = $4`,[adm.name,adm.email,adm.password],(err,res)=>{

          if(err !=null){
            reject(err);
          } else{
            resolve(true)
          }
        })
    })
  },
  
  remove(id){
    return new Promise((resolve,reject)=>{
      db.query(` DELETE FROM adms WHERE id = $1`,[id],(err,res)=>{
        if(err !=null){
          reject(err);
        } else{
          resolve(true)
        }
      })
    })
  }
  
}
