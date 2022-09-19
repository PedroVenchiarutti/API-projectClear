const genericQuerys = require("../repositories/genericQuerys.js");
const apiError = require("../error/apiError.js");
const crypto = require("../config/bcrypt.js");
const ApiError = require("../error/apiError.js");
const { object } = require("yup");

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

  genericQuerys
    .select("users", id)
    .then((client) => {
      if (client[0]) res.send(client[0]);
      else {
        next(apiError.notFound("Usuario não encontrado"));
      }
    })
    .catch((e) => {
      next(apiError.badRequest(e.message));
    });
};

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

    genericQuerys.verifyIfExists("users", [client.email, client.password]).then(
      (resp) => {
        client.password = newPassword;

        genericQuerys
          .insertTable("users", client)
          .then((response) => {
            res.send("deu bom");
          })
          .catch((e) => {
            next(apiError.badRequest(e.message));
          });
      },
      (e) => {
        next(apiError.badRequest(e.message));
      }
    );
  } catch (e) {
    next(apiError.badRequest(e.message));
  }
};

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

  const client = req.body;
  genericQuerys
    .updateTable("users", client)
    .then(() => {
      res.status(200).send();
    })
    .catch((error) => {
      //console.log(error);
      next(ApiError.badRequest(error.message));
    });
};

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

  genericQuerys
    .deleteTable(id)
    .then((client) => {
      if (client[0]) res.send(client);
      else {
        next(apiError.notFound("conta nao encontrada"));
      }
    })
    .catch((err) => {
      next(apiError.badRequest(err.message));
    });
};

exports.updatePassword = async (req, res, next) => {
  /*
      #swagger.tags = ['client']
      #swagger.summary = 'Altera a senha de um usuario.'
      #swagger.parameters['user'] = {
        in: 'body',
        description: "Modelo de Usuario",
        schema:{
          $password:"auau123",
          $newPassword:"auau123"
        }
      }
  */

  try {
    genericQuerys.select("users", req.authenticatedUserId).then((client) => {
      crypto
        .verifyPassword(req.body.password, client[0].password)
        .then((resp) => {
          if (resp) {
            crypto.gemPassword(req.body.newPassword).then((newPassword) => {
              //console.log(newPassword);
              genericQuerys
                .updatePassword("users", [newPassword, req.authenticatedUserId])
                .then((resp) => {
                  res.status(200).send("Senha alterada com sucesso");
                })
                .catch((e) => {
                  next(apiError.badRequest(e.message));
                });
            });
          } else {
            next(apiError.badRequest("senha incorreta"));
          }
        });
    });
  } catch (err) {
    next(apiError.badRequest(err.message));
  }
};

exports.updateDateClient = async (req, res, next) => {
  /*
      #swagger.tags = ['client']
      #swagger.summary = 'Altera os dados de um usuario.'
      #swagger.parameters['user'] = {
        in: 'body',
        description: "Modelo de Usuario",
        schema:{
          $name:"Oliver",
          $email:"",
          $password:"",
          $phone:1398765432,
          $cpf:88888888888,
          $sexo:"Masculino",
          $birth:"1009202001",
          $img_url:"link.com.br/img.png"
        }
      }
  */

  try {
    genericQuerys.select("users", req.authenticatedUserId).then((client) => {
      const clientUpdate = {};

      const { name, email, phone, cpf, sexo, img_url } = client[0];

      const data = {
        name: req.body.name || name,
        email: req.body.email || email,
        phone: req.body.phone || phone,
        cpf: req.body.cpf || cpf,
        sexo: req.body.sexo || sexo,
        img_url: req.body.img_url || img_url,
      };

      Object.assign(clientUpdate, data, req.body);

      genericQuerys
        .updateClient("users", data, req.authenticatedUserId)
        .then((resp) => {
          res.status(200).send("Dados alterados com sucesso");
        })
        .catch((e) => {
          next(apiError.badRequest(e.message));
        });
    });
  } catch (err) {
    next(apiError.badRequest(err.message));
  }
};
