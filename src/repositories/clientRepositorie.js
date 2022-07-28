const db = require("../config/dbconnect");

module.exports = {

    newClient(client){
        return new Promise((resolve,reject)=>{

            try{
            db.exec(`INSERT INTO users 
                (name,email,password,phone,cpf,sexo,birth,img_url)`,
            [client.name, client.email, client.password, client.phone, client.cpf, client.sexo, client.birth, client.img_url])
          .then(response => {
            resolve({ok:"ok"})
          })
          .catch(e => {
            // redirecionar para o tramento de erros
            reject( e.message)
          })
 
        }
        catch(e){
            reject({error:e})
        }

        })
        
   }


}