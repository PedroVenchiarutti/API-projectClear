const adminRepository = require('../repositories/adminRepository.js');
const apiError = require('../error/apiError.js');
const crypto = require('../config/bcrypt.js');
const jwt = require("jsonwebtoken");

const generateToken = (id) => {

  const expires = new Date(Date.now()+10800000);
  const generatedToken = jwt.sign({ id, isAdmin: true }, process.env.SECRET, { expiresIn: 10800 });
 
  return {generatedToken,expires};

}

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    adminRepository.getByLogin(email, password).then(admin => {
        admin.password = null;
   
        res.send({ admin, token: generateToken(adm => adm.id) })
   
      }).catch(error => next(apiError.badRequest(error)));
}

exports.getAll = (req, res, next) => {
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

exports.getByid = async (req, res, next) => {

  const id = req.params.id;

  adminRepository.select('adms', id)
    .then(adm => {
      res.send(adm)
    }, (e) => {

      next(apiError.badRequest(e.message))
    })

}

exports.add = async (req, res, next) => {

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

    const newPassword = await crypto.gemPassword(adm.password);

    adminRepository.verifyIfExists("adms", [adm.email, adm.password])
      .then(resp => {

        adm.password = newPassword;

        adminRepository.insertTable("adms", adm)
          .then(response => {
            res.send();
          }, (e) => {
            next(apiError.badRequest(e.message))
          });
      }, (e) => {
        next(apiError.badRequest(e.message))
      })
  } catch (e) {
    next(apiError.badRequest(e.message))
  }
}

exports.update = (req, res, next) => {

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

exports.remove = async (req, res, next) => {
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
  adminRepository.dashboard().then(data => {
    console.log(data)
    res.send(data);
  }, (e) => {
    next(apiError.badRequest(e.message))
  })
}
