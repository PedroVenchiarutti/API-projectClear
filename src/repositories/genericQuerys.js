const db = require('../config/dbconnect.js');
const utils = require('../helpers/Utils.js');

class genericQuerys {

  // select all || por id
  static select(table, id = null) {

    return new Promise((resolve, reject) => {

      let query = `SELECT * FROM ${table}`;
      let params = []

      if (id) {
        query += " WHERE id = $1"
        params.push(id);
      }

      db.exec(query, params)
        .then(results => {
          resolve(results);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  static verifyIfExists(table, params) {

    return new Promise((resolve, reject) => {

      let query = `SELECT * FROM ${table} WHERE email = $1 AND password = $2`;

      let param = [];

      param.push(params.email);
      param.push(params.password)

      db.exec(query, param).then(response => {

        if (!response[0]) {
          resolve()
        } else {
          reject("ja cadastrado");
        }
      }, (e) => {
        reject(e);
      })
    })
  }

  // multiples ids
  static selectMultiID(tableName, ids) {
    return new Promise((resolve, reject) => {

      const params = []

      let table;

      if (tableName == "procedures") {
        table = '"procedures"'
      } else
        table = tableName;

      let query = `SELECT * FROM ${table} WHERE id IN (`;

      query = utils.inIds(query, ids);

      ids.forEach(id => {
        params.push(parseInt(id));
      });

      db.exec(query, params).then(results => {
        resolve(results)
      }, (e) => {
        reject(e)
      })
    })
  }

  static insertTable(table, params) {

    return new Promise((resolve, reject) => {

      let query = `INSERT INTO ${table} (`

      const keys = Object.keys(params);

      let paramKey = []
      keys.forEach(key => {
        query += `${key},`;
        paramKey.push(key);
      })

      query = query.slice(0, -1);

      query += ") VALUES("

      query = utils.inIds(query, paramKey)

      let prop = [];

      paramKey.forEach(param => {
        prop.push(params[param])
      })

      db.exec(query, prop)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err)
        })
    })

  }

  static updateTable(table, params) {

    return new Promise((resolve, reject) => {

      let query = `UPDATE ${table} SET `

      const keys = Object.keys(params);

      let count = 1;

      let paramKey = []
      let props = []

      keys.forEach(key => {

        paramKey.push(key);
        query += `${key}=$${count},`;
        count++;
        props.push(params[key])
      })

      query = query.slice(0, -1);

      db.exec(query, props)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })

    })
  }

  static deleteTable(table, id, prop = "") {

    return new Promise((resolve, reject) => {

      let query = prop ?
        `DELETE FROM ${table} WHERE ${prop} = $1` :
        `DELETE FROM ${table} WHERE id = $1`

      // change to in ids

      db.exec(query, [id])
        .then(response => {
          resolve()
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  static deleteMultiId(table, ids) {

    return new Promise((resolve, reject) => {

      let query = `DELETE FROM ${table} WHERE id IN (`

      query = utils.inIds(query, ids);

      db.exec(query, ids)
        .then(results => {
          resolve()
        }, (e) => {
          reject(e);
        })
    })
  }
}

module.exports = genericQuerys
