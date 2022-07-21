const db = require("../config/db/dbconnect.js");
const Utils = require("../Utils/Utils.js");
const procedureController = require('./procedureController');

//Reservation Controller do reservationRouter.js

module.exports ={

    /*
        reservationsByuser
        reservations procedures = f
        crud
    */

    getByUserId(userId){
        
        return new Promise((resolve,reject)=>{

            const list = []
            
            db.query(
                `SELECT rp.procedure_id FROM reservations as r
	                JOIN reservation_procedures AS rp ON r.id = rp.reservation_id 
	                WHERE user_id = $1`,
                [userId],(err,res)=>{
                    if(err){
                        reject(err)
                    } else{

                        let ids = []; 
                       
                        res.rows.forEach(id=>{
                            ids.push(id.procedure_id);
                        })
                        
                        Utils.selectMultiID("procedures",ids)
                            .then(procedures=>{
                               
                                let count =0;
                                
                                procedures.forEach(procedures=>{
                                    
                                    let array = {
                                        procedures                                       
                                    };
                                    list.push(array);                                    
                                })

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
            
            const list=[];
            
            db.query(`SELECT procedure_id FROM reservation_procedures
                        WHERE reservation_id = $1`,
                        [reservation_id],
                        (err,res)=>{
                            if(err){
                                reject(err);
                            } else{

                                let ids = []; 
                       
                                res.rows.forEach(id=>{
                                    ids.push(id.procedure_id);
                                })
                                
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
    getAll(){
       return new Promise((resolve,reject)=>{
       
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
                            reject(err);
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
            exec = query.slice(0,-1);

            db.query(query,(err,res)=>{

                if(err){
                    reject(err);
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
                    reject(err)
                }else{ 
                    // update de Procedimentos   
                    db.query(`
                        DELETE reservation_procedures 
                            WHERE reservations_id = $1`
                        ,[reservation_id],
                        (err,res)=>{
                            if(err){
                                reject(err)
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

    remove(reservationIds){

        // arrumar o delete com join   
        return new Promise((resolve,reject)=>{

            let query = `DELETE reservation_procedures 
                            WHERE reservation_id in (`;
            
            let count = 1 ;

            reservationIds.forEach(id=>{
                query+=`$${count},`;
                count++;
            })

            query.slice(0,-1);
            query += ")";

            db.query(query,reservationIds,(err,res)=>{
                if(err){
                    reject(err)
                } else{
                    resolve();
                }
            })
       })
    }
}