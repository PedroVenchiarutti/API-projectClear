const db = require('../config/db/dbconnect');
const Utils = require('../Utils/Utils');

module.exports = {

    // seleciona a partir de um array de ids
    getById(ids){
        return Utils.selectMultiID('Procedures',ids)        
    },

    getAll(){
        return new Promise((resolve,reject) => {
            db.query(`SELECT * FROM procedures`, (err, res) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(res.rows)
                }
            })
        })
    },

    add(procedure){
        return new Promise((resolve,reject)=> { 
            db.query(`INSERT INTO procedures(name,value,categorie) VALUES($1,$2,$3)`),
                [procedure.name,procedure.value,procedure.categorie],
                (err,res)=>{
                    if(err){
                        reject(err)
                    } else{
                        resolve(res.rows)
                    }
            }
        })
    },

    update(id,procedure){
        return new Promise((resolve,reject) => {
            db.query(`
                UPDATE procedures 
                    SET name = $1, value = $2, categorie = $3
                     WHERE id = $4`),
                [procedure.name, procedure.value, procedure.categorie, id], 
                (err, res) => {
                
                if(err){
                    reject(err)
                }else {
                    resolve(res.rows);
                }
            } 
        })
    },

    delete(id){
        return new Promise((resolve,reject) => {
            db.query(`DELETE FROM procedures WHERE id = $1`),
                [id],
                (err,res)=>{
                if(err){
                    reject(err)
                } else{
                    resolve(res.rows)
                }
            }
        })
    }
}