const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const routes = require('../routes/index.js');
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

const allowCors = require("./cors");
const PORT = 3333;


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(allowCors);
server.use(cors());

server.use('/api', routes)
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
