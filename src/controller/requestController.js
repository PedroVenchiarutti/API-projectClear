const db = require('../config/db/dbconnect');
const productController = require("./productController");

module.exports = {

    getByUserId(userId){
        
        return new Promise((resolve,reject)=>{
            // padronizar o array de Jsons 
            const list = [];
            
            db.query(`
                SELECT id,request_product_id FROM request 
                    WHERE user_id =$1;`,
                    [userId],(err,res)=>{
                        if(err){
                            reject(err)
                        } else{
                            const js = [];
                            res.rows.forEach(rpId=>{
                                
                                js.push(rpId.request_id);
                                
                                db.query(`
                                    SELECT qt_product, product_id FROM request_products
                                        WHERE request_id = $1;`,
                                        [res.id],(error,resRp)=>{

                                        js.push(resRp.qt_product);
                                        
                                        if(error){
                                            reject(error)
                                        }
                                        else{
                                            
                                            resRp.rows.forEach(productInfo=>{
                                                productController.getProduct(productInfo.product_id)
                                                    .then(response=>{
                                                        js.push(productInfo);
                                                        list.push(js);
                                                    }).catch();
                                            })  
                                        }
                                })
                            })
                        }
            })
            resolve(list);
        })
    },
    
    getAll(){
        return new Promise((reject,resolve)=>{
        })
    },
    
    add(){
        return new Promise((reject,resolve)=>{
        })
    },

    remove(){
        return new Promise((reject,resolve)=>{
        })
    }
}