const swaggerAutogen = require('swagger-autogen')()
const doc = {
  info: {
    title: 'ElegancceAPI',
    version: "0.8.2",
    description: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  host: 'localhost:3333/api',
  schemes: ['http'],
  securytiDefinitions:{
    
  }
};

const outputFile = './src/config/swagger_output.json'
const endpointsFiles = ['./src/config/server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
