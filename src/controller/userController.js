const db = require("../config/db/dbconnect.js");
const uploadFile = require("../Utils/FirebaseController.js");

module.exports = {
  login(email, password) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT id,name 
                  FROM users 
                    WHERE email = $1 AND password = $2`,
        [email, password],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.rows[0]);
          }
        }
      );
    });
  },

  getUser(id) {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM users WHERE id = $1;", [id], (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(res.rows[0]);
        }
      });
    });
  },

  addUser(user) {
    console.log(user);
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (name,email,password,phone,cpf,sexo,img_url)
                  VALUES($1,$2,$3,$4, $5,$6,$7)`,
        [
          user.name,
          user.email,
          user.password,
          user.phone,
          user.cpf,
          /* user.data_nascimento, */
          user.sexo,
          user.img_url,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        }
      );
    });
  },

  updateUser(user) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users 
                  SET name=$1,email=$2,password=$3,phone=$4,cfp=$5,data_nascimento=$6,sexo=$7,imgurl=$8
                    WHERE id=$5`,
        [
          user.name,
          user.email,
          user.password,
          user.phone,
          user.cpf,
          user.data_nascimento,
          user.sexo,
          user.imgurl,
        ],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(true);
          }
        }
      );
    });
  },

  removeUser(id) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id = $1`, [id], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  },
};
