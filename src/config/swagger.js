const swaggerAutogen = require('swagger-autogen')()
const doc = {
    info: {
      title: 'ElegancceAPI',
      description: '',
    },
    host: 'localhost:3333',
    schemes: ['http'],
  };
  
const outputFile = './src/config/swagger_output.json'
const endpointsFiles = ['./src/config/server.js'];

swaggerAutogen(outputFile, endpointsFiles,doc);
