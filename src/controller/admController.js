const adminRepository = require('../repositories/adminRepository.js');
const apiError = require('../error/apiError.js');

exports.getAll = (req, res,next) => {
  /* 
    #swagger.tags = ['admin']
    #swagger.summary = 'Busca todos os administradores cadastrados no banco de dados'
  */

  adminRepository.select("adms")
    .then(adms => {
      res.send(adms)
    }, (e) => {
      next(apiError.badRequest(e.message))
    })

}

exports.getByid = async (req, res,next) => {

  const id = req.params.id;

  adminRepository.select('adms', id)
    .then(adm => {
      res.send(adm)
    }, (e) => {

      next(apiError.badRequest(e.message))
    })

}

exports.add = (req, res, next) => {

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

  const adm = req.body;

  adminRepository.insertTable("adms", adm)
    .then(response => {
      res.send();
    }, (e) => {

      next(apiError.badRequest(e.message))
    })
}

exports.update = (req, res,next) => {
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

  const adm = req.body;

  adminRepository.updateTable(adm)
    .then(response => {
      res.send()
    }, (e) => {

      next(apiError.badRequest(e.message))
    })
}

exports.remove = async (req, res,next) => {
  /*
     #swagger.tags = ['admin']
     #swagger.summary = 'Deleta uma conta de administrador.' 
    */

  const id = req.params.id;

  adminRepository.deleteTable("adms", id)
    .then(response => {
      res.send(response)
    }, (e) => {
      next(apiError.badRequest(e.message))
    })
}

exports.dashboard = (req, res, next) => {
  
  adminRepository.dashboard().then(data=>{
    console.log(data)
    res.send(data);
  },(e)=>{
    next(apiError.badRequest(e.message))
  })
}
