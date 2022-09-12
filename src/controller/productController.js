const apiError = require("../error/apiError.js");
const productRepository = require("../repositories/productRepository.js");

exports.getAll = (req, res, next) => {
  productRepository.getAll()
    .then(results => res.send(results))
    .catch(error => {
      next(apiError.badRequest(error.message));
    })
}

exports.getWithPagination = async (req, res, next) => {
  productRepository.list(req.params.num).then(
    (list) => {
      res.send(list);
    },
    (e) => {
      next(apiError.badRequest(e.message));
    }
  );
};

exports.getById = (req, res, next) => {
  /**
   #swagger.tags = ['product']
   #swagger.summary="Lista todos os produtos"
  */

  const id = req.params.id;

  productRepository.select("products", id).then(
    (product) => {
      res.send(product);
    },
    (e) => {
      next(apiError.badRequest(e.message));
    }
  );
};

exports.search = (req, res, next) => {
  /**
    #swagger.tags = ['product']
    #swagger.summary="Busca um produto."
    #swagger.parameters['product'] => {
      in: "body",
      description: "modelo de Produto a ser enviado",
      schema:{
        $search:"Creme"
      }
    }
    */
  const param = req.params.search;

  productRepository.search(param).then(
    (results) => {
      res.send(results);
    },
    (e) => {
      next(apiError.badRequest(e.message));
    }
  );
};

exports.add = (req, res, next) => {
  /**
    #swagger.tags = ['product']
    #swagger.summary="Adiciona um produto no bando de dados"
    #swagger.parameters['product'] => {
      in: "body",
      description: "modelo de Produto a ser enviado",
      schema:{
        $name:"Creme para pentear",
        $value:45.80,
        $description:"loren ipsum....",
        $qt:67,
        $brand:"avon"
      }
    }
    */

  const product = req.body;
  console.log(product);

  productRepository.insertTable("products", product).then(
    (response) => {
      res.send();
    },
    (e) => {
      next(apiError.badRequest(e.message));
    }
  );
};

exports.update = (req, res, next) => {
  /**
    #swagger.tags = ['product']
    #swagger.summary="Atualizacao dos dados de um produto"
    #swagger.parameters['product'] => {
      in:"body",
      description:"modelo de Produto a ser enviado",
      schema:{
        $nome:"Creme para pentear",
        $value:45.80,
        $description:"loren ipsum....",
        $qt:67,
        $brand:"avon"
      }
    }
   */

  const product = req.body;

  productRepository.updateTable("products", product).then(
    (response) => {
      res.send();
    },
    (e) => {
      next(apiError.badRequest(e.message));
    }
  );
};

exports.remove = (req, res, next) => {
  /**
    #swagger.tags = ['product']
    #swagger.summary="Remove um produto do banco de dados"
    #swagger.parameters['id'] => {
      in:"path",
      description:"Codigo identificador do produto",
      type:"intenger"
    }
   */

  const id = req.params.id;
  console.log(id);
  productRepository.deleteTable("products", id).then(
    (response) => {
      res.send();
    },
    (e) => {
      next(apiError.badRequest(e.message));
    }
  );
};
