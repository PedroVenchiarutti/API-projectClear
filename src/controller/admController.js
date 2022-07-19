const db = require('../config/db/dbconnect.js');

module.exports = {

  login(email,senha){

    return new Promise((resolve,reject)=>{
      db.query("SELECT name,email FROM adms WHERE email = $1, password = $2 ",
        [email,password],(req,res)=>{

          if(err != null){
            reject(err);
          }
          else{
            resolve(res.rows[0]);
          }
        });
    }
  )},

  getAdms(){
   
    return new Promise((resolve,reject)=>{
      db.query("SELECT * FROM adms",(req,res)=>{

        if(err != null){
          reject(err)
        }
        else{
          resolve(res.rows)
        }
      })    ;
    })
  },

  /* {
   *  name,
   *  email,
   *  password
   *  }
   */

  addAdm(adm){

    return new Promise((resolve,reject)=>{

    });
  
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

    return new Promise((resolve,reject)=>{})
  }
  
}
