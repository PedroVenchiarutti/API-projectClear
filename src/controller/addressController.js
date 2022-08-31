const apiError  = require("../error/apiError.js");
const addressRepository = require('../repositories/addressRepository.js')

exports.getById = (req, res, next) => {
  /*
     #swagger.tags = ['address']
     #swagger.summary = 'Retorna um endereço pelo id.'
  */

  const id = req.params.id;

  addressRepository.select('addresses', id)
    .then(addresses => {
      res.send(addresses)
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

exports.getByUserId = (req, res, next) => {
  /*
     #swagger.tags = ['address']
     #swagger.summary = 'Retorna todos os endereço pelo id do usuario.'
    */

  const id = req.params.id;

  addressRepository.select('addresses', id)
    .then(addresses => {
      res.send(addresses)
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

exports.add = (req, res, next) => {
   /*
     #swagger.tags = ['address']
     #swagger.summary = 'Cadastra um novop endereço.'
     #swagger.parameters['address']=>{
      in: 'body',
      description: "address Model",
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
  const address = req.body;
  console.log(address)

  addressRepository.insertTable("addresses", address)
    .then(results => {
      res.send();
    }, (e) => {

      next(apiError.badRequest(e.message));
    })
}

exports.remove = (req, res, next) => {
 /*
     #swagger.tags = ['address']
     #swagger.summary = 'Deleta um endereço a partir do Id.'
   
    */
  const id = req.params.id;

  addressRepository.deleteTable("addresses", id)
    .then(results => {
      res.send();
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}
