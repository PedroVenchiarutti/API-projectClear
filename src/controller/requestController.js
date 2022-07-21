const db = require('../config/db/dbconnect');
const productController = require("./productController");



//Request products
module.exports = {

    getByUserId(userId){
        
        return new Promise((resolve,reject)=>{

            // padronizar o array de Jsons 
            const list = [];

            db.query(`SELECT id FROM requests WHERE user_id = $1`,
                [userId],
                (err,res)=>{

                    if(err){
                        reject(err);
                    } else{
                          
                        let ids = [];
                        res.rows.forEach(request=>{
                            ids.push(request.id)
                        })

                    }
                }); 

        })
    },
   


    /* -- Pedro

        TABLES requests, requests_products, products
    
        selecionar todas as requests e seus dados relacionados 
        e os produtos referentes e os produtos
        referentes a cada uma das requisisoes

        select * from requests W

        retorno da funcao ARRAY DE JSONs 
        [
            {
                request_id,
                user_id,
         
                qt_product,
                listProduct: {
                   product:{
                    name,
                    value
                   }
                }
            }
        ]
        */ 

    
    getAll(){
        let list = [];
            return new Promise((resolve,reject)=>{
            db.query(``,(err,res) => {
                if(err){
                    reject(err)
                } else{
                    resolve(res.rows);
                }
            })
        })   
    },

    add(products,user_id){
        return new Promise((reject,resolve)=>{
           
        })
    },

    remove(){
        return new Promise((reject,resolve)=>{
        })
    }
}