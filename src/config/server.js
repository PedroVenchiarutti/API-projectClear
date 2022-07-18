const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const allowCors = require("./cors");
const PORT = 3333;

// rotas
const clientRoutes = require('../routes/clientRoutes.js');
const productRoutes = require('../routes/productRoutes.js');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(allowCors);
server.use(cors());


// rotas abertas


// rotas fechadas // futuramente
server.use('/api', clientRoutes);
server.use('/api',productRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
