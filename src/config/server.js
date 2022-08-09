const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const routes = require('../routes/index.js');
const apiErrorHandler = require('../error/errorHandler.js');

const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const allowCors = require("./cors");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(allowCors);
server.use(cors());

server.use('/api', routes)
server.use(apiErrorHandler)
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));


module.exports = server;
