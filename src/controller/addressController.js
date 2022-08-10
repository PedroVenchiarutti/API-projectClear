const genericQuerys = require("../repositories/genericQuerys.js");

// client addresses
exports.get = (req, res, next) => {

  const id = req.params.id;

  genericQuerys.select('addresses', id)
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
     #swagger.parameters['adress']=>{
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

  genericQuerys.insertTable("addresses", address)
    .then(results => {
      res.send();
    }, (e) => {

      next(apiError.badRequest(e.message));
    })
}

exports.remove = (req, res, next) => {

  const id = req.params.id;

  genericQuerys.deleteTable("addresses", id)
    .then(results => {
      res.send();
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}
