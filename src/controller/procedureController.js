const db = require('../config/db/dbconnect');


module.exports = {

    /** -- Dale Pedro --
     * get all
     * update
     * delete
     * insert
     */


    getById(id){
        return new Promise((resolve,reject)=>{
            db.query(`SELECT * FROM procedures WHERE id =$1`,[id],(err,res)=>{
                if(err){
                    reject(err)
                } else{
                    resolve(res.rows)
                }
            })
        })
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
    }


}