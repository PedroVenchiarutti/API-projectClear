const genericQuerys = require('../repositories/genericQuerys.js')
const apiError = require('../error/apiError.js')
const crypto = require('../config/bcrypt.js');

exports.getByid = async (req, res, next) => {
  /*
      #swagger.tags = ['client']
      #swagger.summary="busca um unico cadastro de cliente no banco de dados"
      #swagger.parameters['id'] = {
        in: "path",
        description:"O codigo identificador do usuario no banco de dados",
        type:"integer"
      }
  */

  const id = req.params.id;

  genericQuerys.select("users", id).then(client => {
      if (client[0])
        res.send(client[0])
      else {
        next(apiError.notFound("Usuario não encontrado"))
      }
    })
    .catch(e => {
      next(apiError.badRequest(e.message));
    })

}

exports.add = async (req, res, next) => {

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

  let client = req.body;

  // function gem password

  try {

    const newPassword = await crypto.gemPassword(client.password);

    genericQuerys.verifyIfExists("users", [client.email,client.password])
      .then(resp => {

        client.password = newPassword;

        genericQuerys.insertTable("users", client)
          .then(response => {
            res.send("deu bom")
          })
          .catch(e => {
            next(apiError.badRequest(e.message));
          });
      }, (e) => {
        next(apiError.badRequest(e.message));
      })
  } catch (e) {
    next(apiError.badRequest(e.message));
  }
}

exports.update = (req, res, next) => {
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

  const client = req.body.content;

  if (client.id || typeof client.id == "number") {
    res.status(500).send("error");
  }

  genericQuerys.insertTable(client)
    .then(reponse => {
      res.send()
    })
    .catch(e => {

      next(apiError.badRequest(e.message));
    });
}

exports.remove = async (req, res, next) => {
  /* 
   #swagger.tags = ['client']
   #swagger.summary = 'Deleta um usuario do banco de dado a partir do seu id.'
   #swagger.parameters['id'] = {
     in: "path",
     description:"O codigo identificador do usuario no banco de dados",
     type:"intenger"
   }
   */

  const id = req.params.id;

  genericQuerys.deleteTable(id)
    .then(client => {
      if (client[0])
        res.send(client)
      else {
        next(apiError.notFound('conta nao encontrada'))
      }
    })
    .catch(err => {

      next(apiError.badRequest(err.message));
    })
}
