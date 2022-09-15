const bcrypt = require("bcrypt");
const saltRounds = 10;

// gem hash from a password
exports.gemPassword = async (password) => {
  const hash = await bcrypt.hashSync(password, saltRounds);

  return hash;
};

exports.verifyPassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash).then(
      (results) => {
        resolve(results);
      },
      (e) => {
        reject(e);
      }
    );
  });
};

exports.getHash = (password) => {
  return bcrypt.hashSync(password, saltRounds);
}

