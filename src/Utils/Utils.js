const db = require('../config/db/dbconnect');

module.exports ={
    
    idAddList(list, query){
        
        let num = 1;
            
        list.forEach(id => {
            query += `$${num},`;  
            num++;  
        });

        let exec = query.slice(0,-1);

        exec +=`)`; 

        return query;
    },
    selectMultiID(tableName,ids){
        
        return new Promise((resolve,reject)=>{
        
            const params = []                

            let table ;
            if(tableName =="procedures"){
                table = '"procedures"'
            } else
                table = tableName;
                
            let query = `SELECT * FROM ${table} WHERE id IN (`;
            
            let num = 1;
            
            ids.forEach(id => {
                params.push(parseInt(id));
                query += `$${num},`;  
                num = num+1;  
            });

            query = query.slice(0,-1);
            query +=`)`; 

            db.query(query,params,(err,res)=>{
                if(err){
                    reject(err)
                } else{
                    resolve(res.rows)
                }
            })
        })

    }
    
    //toTimestamp(){}

}