const db = require("../config/dbconnect.js");

const validation = require('../middlewares/validationMiddleware');
const clientSchema = require('../validations/clientvalidation');

const clientRepository = require('../repositories/clientRepositorie');
const { response } = require("express");

exports.get = (req, res) => {
  /*
      #swagger.tags = ['client']
      #swagger.summary="busca um unico cadastro de cliente no banco de dados"
      #swagger.parameters['id'] = {
        in: "path",
        description:"O codigo identificador do usuario no banco de dados",
        type:"intenger"
      }
     
     */
  try {
    db.exec(`SELECT * FROM users WHERE id = $1`,
        [req.params.id])
      .then(user => {
        res.send(user);
      })
      .catch(e => {
        res.send(e.message)
      })
  } catch {
    res.send('f servidor')
  }

}

exports.add =  (req, res) => {
  /*
     #swagger.tags = ['client']
     #swagger.summary = 'Cria uma nova conta de cliente.'
     #swagger.parameters['user']=>{
     in: 'body',
     description: "Modelo de Usuario",
     schema:{
       $name:"Oliver",
       $email:"oliver@gmail.com",
       $password:"auau123",
       $phone:1398765432,
       $cpf:88888888888,
       $sexo:"M",
       $birth:1658757654250,
       $img_url:"link.com.br/img.png"
     }
   } 
    */
   console.log("alguem me salva")
   try {
    const client = req.body;
   
    console.log("O yup nao é tao ruim")
    clientRepository.newClient(client)
      .then(response=>{
          res.send("deu bom")
      })
      .catch(e=>{
        response.send(e)
      });
  

  } catch(e) {
    throw e
    res.send(e);
  }
}

exports.update = (req, res) => {
  /*
     #swagger.tags = ['client']  
     #swagger.summary = 'Altera os dados de uma conta client. '
     #swagger.parameters['user']=>{
      in: 'body',
      description: "Modelo de Usuario",
      schema:{
        $id:12,
        $name:"Oliver",
        $email:"oliver@gmail.com",
        $password:"auau123",
        $phone:1398765432,
        $cpf:88888888888,
        $sexo:"M",
        $birth:1658757654250,
        $img_url:"link.com.br/img.png"
      }
    } 
     */

  try {

    const user = req.body;

    db.exec(`
      UPDATE users 
        SET name=$1,email=$2,password=$3,phone=$4,cpf,sexo,birth,img_url
          WHERE id=$5`,
        [user.name, user.email, user.password, user.phone, user.cpf, user.sexo, user.birth, user.img_url])
      .then(response => {
        res.send(response);
      })
      .catch(e => {
        res.send(e.message)
      })
  } catch {
    // faz algo ai bixo
    res.send("f Api")
  }
}


exports.remove = (req, res) => {
  /* 
   #swagger.tags = ['client']
   #swagger.summary = 'Deleta um usuario do banco de dado a partir do seu id.'
   #swagger.parameters['id'] = {
     in: "path",
     description:"O codigo identificador do usuario no banco de dados",
     type:"intenger"
   }
    
    */
  try {

    db.exec('DELETE users WHERE id = $1', [req.params.id])
      .then(response => {
        res.send(response)
      })
      .catch(e => {
        res.send(e);
      })
  } catch {
    res.send('f servidor')
  }
}
