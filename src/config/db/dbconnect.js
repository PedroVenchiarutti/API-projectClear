const {Client} = require('pg')

require('dotenv/config');

function newClient() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false
    }
  });
  return client
}

// Para multiplso selects
exports.newClient = () => newClient();

exports.exec = (query, params = []) =>{

  return new Promise((resolve,reject)=>{

    const client = newClient();

    client.connect();

    client.query(query, params)
      .then(results => {
        resolve(results.rows);
      })
      .catch(e => {
        reject(e)
      })
      .then(() => client.end())
  })
}
