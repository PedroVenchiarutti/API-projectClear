const db = require("../config/db/dbconnect.js");

module.exports = {

    login(email,password){

      return new Promise((resolve,reject)=>{
        db.query(`SELECT id,name 
                  FROM users 
                    WHERE email = $1 AND password = $2`,[email,password],(err,res)=>{
        
          if(err){
            reject(err);
          }
          else{
            resolve(res.rows[0]);
          }
        })
      }
      )},
  
    getUser(id){

      return new Promise((resolve,reject)=>{

        db.query("SELECT * FROM users WHERE id = $1;",[id],(err,res)=>{
          if(err){
            console.log(err) 
            reject( err);
          }
          else{
            console.log(res.rows[0])
            resolve(res.rows[0]);
          }
        })
      })

    },

    addUser(user){

      return new Promise((resolve,reject)=>{
      
        db.query(`INSERT INTO users (name,email,password,phone)
                  VALUES($1,$2,$3,$4)`,[user.name,user.email,user.password,user.phone],(err,res)=>{

          if(err){
            reject(err);
          }
          else{
            resolve(true);
          }
          })
      }  
    )},
    
    updatetUser(user){

      return new Promise((resolve,reject)=>{
        db.query(`UPDATE users 
                  SET name=$1,email=$2,password=$3,phone=$4
                    WHERE id=$5`,
          [user.name,
            user.email,
            user.password,
            user.phone,
            user.id],(err,res)=>{

              if(err){
                reject( err);
              }
              else{
                resolve(true);
              }
            })
      }  
    )},

    removeUser(id){
      
      return new Promise((resolve,reject)=>{
        db.query(`DELETE FROM users WHERE id = $1`,[id],(err,res)=>{
          if(err){
            reject(err);
          }
          else{
            resolve(true);
          }
        })
      }  
    )}
}
