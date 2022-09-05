const { exec } = require('../config/dbconnect.js');
const cripto = require('../config/bcrypt.js');

const getQuery = table => `SELECT * FROM ${table} WHERE EMAIL = $1`;

const getMatchedLogin = email => {
  return new Promise(resolve => {
    exec(getQuery("adms"), [email]).then(results => {
      if (results.length) resolve(results[0])
      else getMatchedUser(email).then(user => resolve(user)).catch(() => reject());
    }).catch(error => reject(error));
  });
}

const getMatchedUser = email => {
  return new Promise((resolve, reject) => {
    exec(getQuery("users"), [email]).then(results => {
      if (results.length) resolve(results[0]);
      else reject("Usuário inexistente");
    })
  })
}

const login = (email, password) => {
  return new Promise((resolve, reject) => {
    getMatchedLogin(email).then(user => {
      cripto.verifyPassword(password, user.password).then(() => resolve()).catch(() => reject("Senha incorreta"));
    }).catch(error => reject(error));
  });
}

module.exports = login