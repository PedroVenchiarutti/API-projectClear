const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();
const allowCors = require("./cors");
const PORT = 3333;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(allowCors);
server.use(cors());

server.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
