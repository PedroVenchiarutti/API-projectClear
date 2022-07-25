const swaggerAutogen = require('swagger-autogen')()
const doc = {
    info: {
      title: 'ElleganceAPI',
      description: '',
    },
    host: 'localhost:3333',
    schemes: ['http'],
  };
  
const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/config/server'];

swaggerAutogen(outputFile, endpointsFiles,doc)