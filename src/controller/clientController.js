const db = require("../config/dbconnect.js");

const validate = require('../middlewares/validationMiddleware');
const {
  clientSchema,
  clientId
} = require('../validations/clientvalidation');

const clientRepository = require('../repositories/clientRepositorie');

exports.getByid = (req, res) => {
  /*
      #swagger.tags = ['client']
      #swagger.summary="busca um unico cadastro de cliente no banco de dados"
      #swagger.parameters['id'] = {
        in: "path",
        description:"O codigo identificador do usuario no banco de dados",
        type:"integer"
      }
     
     */

  try {
    const id = ({
      id: parseInt(req.params.id)
    })

    clientId.isValid(id)
      .then(valid => {
        clientRepository.getByid(id.id)
          .then(client => {
            res.status(200).send(client)
          }).catch(e => {
            res.status(404).send()
          })
      }).catch(error => {
        res.status(400).send(error)
      })
  } catch {
    res.status(500).send(error)
  }

}

exports.add = validate(clientSchema), (req, res) => {
  
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
        $birth:"1009202001",
        $img_url:"link.com.br/img.png"
     }
   } 
  */
  
  try {
    const client = req.body;

    clientRepository.newClient(client)
      .then(response => {
        res.send("deu bom")
      })
      .catch(e => {
        res.send(e)
      });

  } catch (e) {
    res.send(e);
  }
}

exports.update = validate(clientSchema), (req, res) => {
  /*
     #swagger.tags = ['client']  
     #swagger.summary = 'Altera os dados de uma conta client. '
     #swagger.parameters['user']=>{
      in: 'body',
      description: "Modelo de Usuario",
      schema:{
        $id: 23,
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

    const client = req.body;

    if (client.id || typeof client.id == "number") {
      res.status(500).send("error");
    }

    clientRepository.update(client)
      .then(reponse => {
        res.send()
      })
      .catch();

  } catch {
    res.send("bugmon, gonna catch´em all")
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
    const id = ({
      id: parseInt(req.params.id)
    })

    clientId.isValid(id)
      .then(valid => {
        clientRepository.remoove(id.id)
          .then(client => {
            res.status(200).send()
          }).catch(e => {
            res.status(404).send()
          })
      }).catch(error => {
        res.status(400).send(error)
      })
  } catch {
    res.status(500).send(error)
  }
}
