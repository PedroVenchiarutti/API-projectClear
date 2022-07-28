const admRepository = require('../repositories/adminRepository.js');

const validate = require('../middlewares/validationMiddleware.js');
const admSchema = require('../validations/adminValidation.js');

exports.getAll = (req, res) => {
  /* 
    #swagger.tags = ['admin']
    #swagger.summary = 'Busca todos os administradores cadastrados no banco de dados'
    */
    
  try{
    admRepository.getAll()
      .then(adms=>{
        console.log(adms)
        res.send(adms)
      })
      .catch(err=>{
        
      res.status(500).send(err)
      })
  }catch{
      res.status(500)
  }
}


exports.add = validate(admSchema), (req, res) => {
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

  try{
    
    const adm = req.body;

    adminRepository.add(adm)
      .then(response=>{
        res.send();
      })
      .catch(err=>{
      res.status(500).send(err)
      });
  }
  catch(e){

  }
}

exports.update = validate(admSchema),(req, res) => {
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

    try{
    
      const adm = req.body;

      adminRepository.upadte(adm)
        .then(response=>{
          res.send()
        })
        .catch(err=>{
          res.status(500).send(err);
        })
    } catch(e){

    }
}

exports.remove = (req, res) => {
  /*
     #swagger.tags = ['admin']
     #swagger.summary = 'Deleta uma conta de administrador.' 
     */
}
