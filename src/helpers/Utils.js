const db = require('../config/dbconnect');

module.exports ={
     
    inIds(query,params){
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
