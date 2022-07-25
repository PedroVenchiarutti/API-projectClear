const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const swaggerUI = require("swagger-ui-express");
const swaggerFile = require("../../swagger_output.json");

const allowCors = require("./cors");
const PORT = 3333;

// rotas

const requestRoutes = require("../routes/requestRoutes.js");
const clientRoutes = require("../routes/clientRoutes.js");
const productRoutes = require("../routes/productsRoutes.js");
const proceduresRouter = require("../routes/proceduresRoutes.js");
const buysRoutes = require("../routes/buysRoutes.js");
const reservationsRouter = require("../routes/reservationRoutes.js");
const discountsRoutes = require("../routes/discountsRoutes.js");
const adminRoutes = require("../routes/adminRoutes.js");


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(allowCors);
server.use(cors());

// rotas abertas

// rotas fechadas // futuramente
server.use("/api", clientRoutes);
server.use("/api", productRoutes);
server.use("/api", proceduresRouter);
server.use("/api", buysRoutes);
server.use("/api", reservationsRouter);
server.use("/api", discountsRoutes);
server.use("/api", adminRoutes);
server.use("/api", requestRoutes); 
server.use("/docs",swaggerUI.serve,swaggerUI.setup(swaggerFile));

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
