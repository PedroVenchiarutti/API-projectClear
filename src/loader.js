const server = require("./config/server");

const PORT = 3333;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

