const db = require("../config/db/dbconnect.js");
const Utils = require("../Utils/Utils.js");
const userController = require('./userController');

//Reservation Controller do reservationRouter.js

module.exports ={

    getByUserId(userId){
        
        return new Promise((resolve,reject)=>{

            const list = []
            
            db.query(
                `SELECT rp.procedure_id,r.date FROM reservations as r
	                JOIN reservation_procedures AS rp ON r.id = rp.reservation_id 
	                WHERE user_id = $1`,
                [userId],(err,res)=>{
                    if(err){
                        reject(err)
                    } else{

                        let ids = Utils.resJsonToArray(res.rows,"procedure_id");  
                        
                        Utils.selectMultiID("procedures",ids)
                            .then(procedures=>{
                                list.push(procedures)
                                resolve(list)                        
                            })
                            .catch(error=>{
                                reject(error)
                            })    
                    }            
              })
       })
    },

    getProcedures(reservation_id){

        return new Promise((resolve,reject)=>{
             
            db.query(`SELECT procedure_id FROM reservation_procedures
                        WHERE reservation_id = $1`,
                        [reservation_id],
                        (err,res)=>{
                            if(err){
                                reject(err);
                            } else{

                              let ids = Utils.resJsonToArray(res.rows,"procedure_id");
                           
                                Utils.selectMultiID(ids)
                                    .then(procedures=>{
                                        resolve(procedures);
                                    } ).catch(error=>{
                                       reject(error.message)
                                    })
                            }
                });
        })
    },

    // paginacao futura
    // select test
    // usuario ou all
    getAll(userId = null){
       return new Promise((resolve,reject)=>{
            
            const list = [];
            let query = userId ?
                `SELECT * FROM reservations WHERE id = ${userId}` :
                "SELECT * FROM reservations";
            
            db.query(query,(reservationErr,reservations)=>{

                    if(reservationErr){
                        reject({error:reservationErr.message});
                    } else {
                        
                        let query = `SELECT * FROM reservation_procedures
                            WHERE reservation_id IN (`;
                        
                        let params = Utils.resJsonToArray(reservations.rows,"id")
                        
                        query = Utils.inIds(query,params) ;
                        
                        db.query(query,params,(rpError,rpResolve)=>{
                            
                            if(rpError){
                                reject(rpError)
                            } else{
                                Utils.selectMultiID("procedures",Utils.resJsonToArray(rpResolve.rows,"procedure_id"))
                                    .then(procedures=>{
                                   
                                    console.log(Utils.resJsonToArray(reservations.rows,"user_id"));
                                
                                    userController.getName(Utils.resJsonToArray(reservations.rows,"user_id")).then(users=>{
                                        
                                        let procedureArray = [];
                                        let user = null;
                                        
                                        reservations.rows.forEach(reservation=>{

                                            users.rows.forEach(userElement=>{
                                                if(userElement.id == reservation.user_id){
                                                    user = userElement
                                                }
                                            })

                                            rpResolve.rows.forEach(rp=>{

                                                procedures.forEach(procedure=>{
                                                    
                                                    if(rp.procedure_id == procedure.id){
                                                        procedureArray.push(procedure);
                                                    }

                                                })
                                            })

                                            list.push({
                                                reservation,
                                                user,
                                                procedures:procedureArray});
                                        })
                                    
                                    resolve(list);
                                    }).catch(error=>{

                                        reject(error.message)
                                    })                                        

                                }).catch(error=>{
                                    reject({error})
                                })
                            }
                        })
                    }
                })
        })
    },
    
    add(userId, reservationProcedures){

        return new Promise ((resolve,reject)=>{

            db.query(`INSERT INTO reservations (date,userId)
                        VALUES (to_timestamp($1),$2)`,
                        (reservationProcedures.date,userId),
                        (err,res)=>{
                if(err){
                    reject(err)
                }else{

                    let query = `INSERT INTO reservation_procedures (procedure_id,reservation_id) VALUES` ;

                    // revisar futuramente
                    reservationProcedures.procedures.forEach(procedure => {
                        
                        query += `(${procedure.id},(SELECT id FROM reservations
                                     WHERE user_id = ${userId} AND date = ${procedure.date})),`                        
                    });
                    
                    // removendo a ultima virgula
                    exec = query.slice(0,-1);

                    db.query(query,(err,res)=>{

                        if(err){
                            reject(err.message);
                        }
                        else{
                            resolve();
                        }
                    })
                }
            })
        })
    },

    addReservation_procedures(reservationProcedures){
        
        return new Promise((resolve,reject)=>{
             let query = `INSERT INTO reservation_procedures (procedure_id,reservation_id) VALUES` ;

            // revisar futuramente
            reservationProcedures.procedures.forEach(procedure => {
                
                query += `(${procedure.id},(SELECT id FROM reservations
                                WHERE user_id = ${userId} AND date = ${procedure.date})),`
                
            });
            
            // removendo a ultima virgula
            query = query.slice(0,-1);

            db.query(query,(err,res)=>{
                if(err){
                    reject(err.message);
                }
                else{
                    resolve();
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
                    reject(err.message)
                }else{ 
                    // update de Procedimentos   
                    db.query(`
                        DELETE reservation_procedures 
                            WHERE reservations_id = $1`
                        ,[reservation_id],
                        (err,res)=>{
                            if(err){
                                reject(err.message)
                            }else{
                                this.addReservation_procedures(reservationProcedures)
                                    .then(response =>resolve())
                                    .catch(error=>reject(error))                                
                            }
                        });                 
                    resolve(true)
                }
            })
        })
    },

    remove(reservationId,reservationIds){

        // arrumar o delete com join   
        return new Promise((resolve,reject)=>{

            let query = `DELETE reservation_procedures 
                            WHERE reservation_id in (`;
            
            query = Utils.inIds(query,reservationIds);

            db.query(query,reservationIds,(err,res)=>{
                if(err){
                    reject(err.message)
                } else{
                    db.query(`
                        DELETE reservation WHERE id = $1`),
                        [reservationId],
                        (error,response)=>{

                            if(error){
                                reject(error.message);
                            }
                            else{
                                resolve();
                            }
                        }                    
                }
            })
       })
    }
}
