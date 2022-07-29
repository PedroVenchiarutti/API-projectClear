const db = require('../config/dbconnect');

module.exports ={
     
    selectMultiID(tableName,ids){
        return new Promise((resolve,reject)=>{
        
            const params = []                

            let table ;

            if(tableName =="procedures"){
                table = '"procedures"'
            } else
                table = tableName;
                
            let query = `SELECT * FROM ${table} WHERE id IN (`;
            
            query = this.inIds(query,ids);

            ids.forEach(id => {
                params.push(parseInt(id)); 
            }); 

            db.query(query,params,(err,res)=>{
                if(err){
                    reject(err)
                } else{
                    resolve(res.rows)
                }
            })
        })
    },

    inIds(query,params){
        console.log(query,params)        
        let count =1;
        
        params.forEach(id=>{
            query+=`$${count},`;
            count++;
        });
        
        query =query.slice(0,-1);
        query += ")";

        return query;
    }, 
  

    resJsonToArray(list,propName){
      
      let array = [];

      list.forEach(element=>{
        array.push(element[propName])  
      });

      return array
    }
    
}
