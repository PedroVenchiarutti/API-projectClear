const db = require("../config/db/dbconnect.js");
const procedureController = require('./procedureController');

//Reservation Controller do reservationRouter.js


module.exports ={

    /*
        reservationsByuser
        reservations procedures = f
        crud
    */

    getByUserId(userId,reservation_id){
        
        return new Promise((resolve,reject)=>{

            const list = []
            
            db.query(
                `SELECT date FROM reservations WHERE user_id = $1`,
                [userId],(err,res)=>{
                    if(err){
                        reject(err)
                    } else{
                        
                        res.rows.forEach(reservation=>{

                            db.query(`SELECT procedure_id FROM reservation_procedures
                                        WHERE reservation_id = $1`,
                                    [reservation.id],
                                    (err,res)=>{
                                    if(err){
                                        reject(err)
                                    } else{
                                        res.rows.forEach(procedureId=>{
                                        procedureController.getById(procedureId).then(procedure=>{
                                                list.push(procedure);
                                            }).catch(error=>{
                                                reject(error);
                                            });
                                        })
                                    }
                            })
                        })
                        resolve(list)                        
                    }            
              })

       })
    },

    getAll(){
       return new Promise((resolve,reject)=>{
        db.query(`SELECT u.name,r.date,rp.id
                    FROM reservations AS r
                        JOIN users AS u ON u.id = r.user_id
                        JOIN reservation_procedures AS rp ON rp.id = r.reservation_procedure_id;`, 
                (err, res) => {
                    if(err !=null){
                        reject(err)    
                     }
                    else{
                        resolve(res.rows);
                    }
             })
       })
    },
    
    add(userId, reservationProcedures){

        return new Promise ((resolve,reject)=>{

            db.query(`INSERT INTO reservations (date,userId)
                        VALUES ($1,$2)`,
                        (reservationProcedures.date,userId),
                        (err,res)=>{
                if(err){
                    reject(err)
                }else{

                    // revisar futuramente
                    reservationProcedures.procedures.forEach(procedure => {
                        
                        db.query(`INSERT INTO reservation_procedures 
                                    (procedure_id,reservation_id)
                                    VALUES($1,
                                        (SELECT id FROM reservations 
                                            WHERE user_id = $2 AND date = $3))`,
                                (procedure.id,userId,reservationProcedures.date),
                                (err,res)=>{

                                    if(err){
                                        reject(err)
                                    } else{
                                        resolve(true)
                                    }
                            })

                    });
                }
            })
        })
    },

    update(userId,reservation_id,reservationProcedures){
        
        return new Promise ((resolve,reject)=>{

            db.query(`UPDATE reservations 
                        SET date=$1
                            WHERE id = $2 AND user_id = $3 `,
                        [reservationProcedures.date,reservation_id,userId],
                        (err,res)=>{
                if(err){
                    reject(err)
                }else{

                    // revisar futuramente
                    res.rows.forEach(procedure => {                        
                        db.query(`UPDATE reservation_procedures 
                                    SET procedure_id=$1,
                                        WHERE reservation_id = $2`,
                                (procedure.id,reservation_id),
                                (err,res)=>{

                                    if(err){
                                        reject(err)
                                    }
                            })
                    });
                    resolve(true)
                }
            })
        })

    },

    remove(reservationId){

        return new Promise((resolve,reject)=>{

            db.query(`DELETE reservation_procedures WHERE reservation_id = $1`,
                    [reservationId],(err,res)=>{

                        if(err){
                            reject(err)    
                        } else{

                            db.query(`DELETE reservation WHERE id=$`,
                                [reservation_id],
                                (err,res)=>{
                                    if(err){
                                        reject(err)
                                    } else{
                                        resolve(true)
                                    }
                                })
                        }
                    })
        })

    }
}