const db = require('../config/db/dbconnect');
const Utils = require('../Utils/Utils.js');
const userController = require('./userController');

//Request products
module.exports = {

  getByUserId(userId) {

    return new Promise((resolve, reject) => {

      // padronizar o array de Jsons 
      const list = [];

      db.query(`SELECT id FROM requests WHERE user_id = $1`,
        [userId],
        (err, res) => {

          if (err) {
            reject(err.message);
          } else {
            Utils.selectMultiID("request_products", res.rows)
              .then()
              .catch()
          }
        });
    })
  },

  getAll(userId = null) {

    return new Promise((resolve, reject) => {

      const list = [];

      let query = userId ?
        `SELECT * FROM requests WHERE id = ${userId}` :
        "SELECT * FROM requests";

      db.query(query,
        (err, requests) => {
          if (err) {
            reject(err.message)
          } else {
            db.query(`
                        SELECT * FROM request_products`,
              (error, request_products) => {

                if (error) {
                  reject(error.message);
                } else {

                  let productIds = Utils.resJsonToArray(request_products.rows, "product_id")

                  Utils.selectMultiID("products", productIds)
                    .then(products => {

                      userController.getName(Utils.resJsonToArray(requests.rows, "user_id"))
                        .then(users => {

                          requests.rows.forEach(request => {

                            let productsArray = [];

                            let qt;
                            let user = null;

                            users.rows.forEach(element => {
                              if (element.id == request.user_id) {
                                user = element;
                              }
                            })

                            request_products.rows.forEach(rp => {

                              if (rp.request_id == request.id) {

                                qt = rp.qt_product;

                                products.forEach(product => {

                                  if (rp.product_id == product.id) {
                                    product.qt = qt;
                                    productsArray.push(product);
                                  }
                                })
                              }
                            });
                            list.push({
                              date: request.date,
                              user,
                              products: productsArray
                            });

                            productsArray = [];
                          });
                          resolve(list)
                        })
                        .catch(error => {
                          reject(error)
                        })

                    })
                    .catch()

                }
              })
          }
        })
    })
  },

  add(user_id, products) {

    return new Promise((reject, resolve) => {
        

    })
  
  },


  update(request){
    return new Promise((resolve,reject)=>{

    })
  },

  addRp(request_id,products){
      
    return new Promise((resolve,reject)=>{
  
      let query = `INSERT INTO request_products (qt_product,product_id,request_id) VALUES`
        
      products.forEach(product=>{
          
        query += `(${product.qt},${product.id},$1),`;
      });

      query = query.slice(0,-1);

      db.query(query,[request_id],(err,res)=>{
        if(err){
          reject(err)
        } else{
          resolve();
        }
      })
    })
  },

  removeRp(request_id){
    
    return new Promise((resolve,reject)=>{
      
      db.query(`
        DELETE FROM request_products WHERE request_id = $1`,
        [request_id],
        (err,res)=>{
          if(err){
            reject(err)
          } else{
            resove();
          }
        })
    })
  },
  
  remove() {
    return new Promise((reject, resolve) => {})
  }

}
