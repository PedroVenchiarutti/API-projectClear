const validate = require('../middlewares/validationMiddleware');
const idValidation = require('../validations/idValidation.js');

const clientSchema = require('../validations/clientvalidation');

const genericQuerys = require('../repositories/genericQuerys.js')

exports.getByid = async (req, res) => {
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

    const id = req.params.id;

    await idValidation.validate(id);

    genericQuerys.select("users",id).then(client => {
        res.send(client[0])
      })
      .catch(err => {
        res.send(err)
      })

  } catch (e) {
    res.send(e)
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

    genericQuerys.insertTable("users",client)
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

    genericQuerys.insertTable(client)
      .then(reponse => {
        res.send()
      })
      .catch();

  } catch {
    res.send("bugmon, gonna catch´em all")
  }
}

exports.remove = async (req, res) => {
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

    const id = req.params.id;

    await idValidation.validate(id);

      genericQuerys.deleteTable(id)
      .then(client => {
        res.send(client)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  } catch (e) {
    console.log(e)
    res.send(e)
  }
}
