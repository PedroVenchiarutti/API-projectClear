const db = require('../config/db/dbconnect');
const Utils = require('../Utils/Utils.js');

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
                        reject(err.message);
                    } else{
                      Utils.selectMultiID("request_products",res.rows)
                        .then()
                        .catch()
                    }
                }); 
        })
    },

    getAll(){        
        
        return new Promise((resolve,reject)=>{
    
            const list = [];
            
            db.query(`
                SELECT * FROM requests`,
                (err,requests)=>{
                    if(err){
                        reject(err.message)
                    } else{
                        db.query(`
                        SELECT * FROM request_products`,
                        (error,request_products)=>{
                            
                            if(error){
                                reject(error.message);
                            } else{
                                
                                let productIds = Utils.resJsonToArray(request_products.rows,"product_id") 

                                Utils.selectMultiID("products",productIds)
                                    .then(products=>{
                                        requests.rows.forEach(request=>{
                                        
                                            let productsArray =[] ;
                                        
                                            let qt; 

                                            request_products.rows.forEach(rp=>{
                                                
                                                if(rp.request_id == request.id){
                                                    
                                                    qt - rp.qt_product;

                                                    products.forEach(product=>{
                                                                    
                                                        if(rp.product_id == product.id){
                                                            productsArray.push(product);
                                                            
                                                        }
                                                    })  

                                                }
                                            });
                                            
                                            let requestObj = {date:request.date,
                                                          products:productsArray}
                                            
                                            list.push(requestObj);
                                                
                                            productsArray = [];
                                        });
                                        resolve(list)
                                    })
                                    .catch(error=>{
                                        reject(error)
                                    })
                            }

                        })
                    }
                })
        })   
    },

    add(user_id,products){
        return new Promise((reject,resolve)=>{
           db.query(`
                SELECT 
           `)
        })
    },

    remove(){
        return new Promise((reject,resolve)=>{
        })
    }
}
