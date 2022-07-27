const db = require("../config/db/dbconnect.js");

exports.getAll = (req, res) => {
  /* 
    #swagger.tags = ['admin']
    #swagger.summary = 'Busca todos os administradores cadastrados no banco de dados'
    */

  db.exec('SELECT * FROM adms').then(response => {
      res.send(response)
    })
    .catch(e => {
      res.send(e)
    })
}

exports.get = (req, res) => {
  /*
   #swagger.tags = ['admin']
   #swagger,summary = "busca apenas um adm"
   #swagger.parameters['id'] =>{
      in: "path",
      description:"Codigo identificador de usuario no banco de dados",
      type:'integer'
    }
    */

  db.exec("SELECT * FROM adms WHERE id = $1", [req.params.id])
    .then(adm => {
      res.send(adm)
    })
    .catch(e => res.status(500).send(e.message))
}


exports.add = (req, res) => {
  /*
    #swagger.tags = ['admin']
    #swagger.summary = 'Efetua a criação do admin no banco de dados.'
    #swagger.parameters['admin']=>{
      in: 'body',
      description: "Modelo de Admin",
      schema:{
        $name:"Oliver o Adm",
        $email:"oliver@gmail.com",
        $password:"auau123",
      }
    } 
    */

  let adm = req.body;

  try {
    // validar campos futuramente
    db.exec(`
    INSERT INTO adms (name,email,password) 
      VALUES ($1,$2,$3)`,
        [adm.namee, adm.email, adm.password])
      .then(response => {})
      .catch(e => {
        res.send(e)
      })

  } catch {
    res.send('f api')
  }
}

exports.update = (req, res) => {
  /*
  #swagger.tags = ['admin']
  #swagger.summary = 'Efetua a alteraçao das informaões do admin.'
  #swagger.parameters['admin']=>{
    in: 'body',
    description: "Modelo de admin",
    schema:{
      $id:12,
      $name:"Oliver o adm",
      $email:"oliver@gmail.com",
      $password:"auau123",
    }
  } 
  */
  let adm = req.body;

  db.exec(`UPDATE adms 
          SET name=$1, email=$2, password=$3
              WHERE id = $4`,
      [adm.name, amd.email, adm.password])
    .then(response => {
      res.send();
    })
    .catch(e => {
      res.status(400).send(e)
    })
}

exports.remove = (req, res) => {
  /*
     #swagger.tags = ['admin']
     #swagger.summary = 'Deleta uma conta de administrador.' 
   */
  db.exec("DELETE FROM adms WHERE id = $1", [req.params.id])
    .then(response => {
      res.send(response);
    })
    .catch(e => {
      res.send(e.message)
    })
}
