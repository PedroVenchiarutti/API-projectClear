const {
  Client,
  Pool
} = require('pg')

require('dotenv/config');

// poll necessaria para multiplos 
// selects consecutivos
exports.newPool = () => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: false
    }
  })
  return pool;
}

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


exports.exec = (query, params = []) => {

  return new Promise((resolve, reject) => {

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
