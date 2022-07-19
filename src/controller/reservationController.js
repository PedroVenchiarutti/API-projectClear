const db = require("../config/db/dbconnect.js");


//Reservation Controller do reservationRouter.js


module.exports ={

    /*
        reservationsByuser
        reservations procedures = f
        crud
    */

    getAll(){
       return new Promise((resolve,reject)=>{
        db.query(`SELECT u.name,r.date,p.id,p.name
                    FROM reservations AS r
                        JOIN users AS u ON u.id = r.user_id
                        JOIN reservation_procedures AS rp ON rp.id = r.reservation_procedure_id
                        JOIN "procedures" AS p ON p.id = rp.procedure_id;`, 
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

    add(userId, reservation){
        
        /*
            procedure? id
            date
        */
       return new Promise((resolve,reject)=>{
          const newIds = [];
       
            //procedimentos multiplos
            // provissorio
            reservation.procedure.forEach(procedure => {
        
                let id = parseInt(Math.random() * 10000000);
                db.query(`INSERT INTO reservations_procedures(id,procedure_id)
                            VALUES ($1,$2);`,
                            [id,procedure],(err,res)=>{
                
                    if(err){
                        reject(err)
                    }
                    else{
                        newIds.push(id);
                    }
                })

                
         });
     }) 
      
    }

}