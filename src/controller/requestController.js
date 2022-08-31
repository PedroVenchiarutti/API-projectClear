const requestRepository = require('../repositories/requestsRepository.js')
const apiError = require('../error/apiError.js');

exports.getAll = (req, res, next) => {

  /*
   * #swagger.tags = ['request','private']
   * #swagger.description = "Obtem todos as requisisoes ja realizadas no sistema"
   */

  requestRepository.getAll(1)
    .then(results => {

      res.send(results)

    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}

exports.add = (req, res, next) => {

/*
     #swagger.tags = ['request']
     #swagger.summary = 'Cria um novo pedido.'
     #swagger.parameters['request']=>{
      in: 'body',
      description: "Modelo de Usuario",
      schema:{
        $user_id:"Oliver",
        $date:"oliver@gmail.com",
        $address_id:1398765432,
        $products: [
          {
            $qt:11,
            $id:1,
          }
        ]
     }
   } 
  */
  const request = req.body;

  requestRepository.insert(request)
    .then(ok=>{
      res.send()
    },(e)=>{
      next(apiError.badRequest(e.message));
    })
}   

exports.remove = (req, res, next) => {

  const id = req.params.id;
  console.log(id);

  requestRepository.remove(id)
    .then(results => {
      res.send();
    }, (e) => {
      next(apiError.badRequest(e.message));
    })
}
