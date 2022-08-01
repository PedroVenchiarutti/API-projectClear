const db = require('../config/dbconnect.js');
const utils = require('../helpers/Utils.js');


module.exports = {

  // select all || por id
  select(table, id = null) {

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
  },
  // multiples ids
  selectMultiID(tableName, ids) {
    return new Promise((resolve, reject) => {

      const params = []

      let table;

      if (tableName == "procedures") {
        table = '"procedures"'
      } else
        table = tableName;

      let query = `SELECT * FROM ${table} WHERE id IN (`;

      query = this.inIds(query, ids);

      ids.forEach(id => {
        params.push(parseInt(id));
      });

      db.query(query, params, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res.rows)
        }
      })
    })
  },

  // select for pagination
  selectPages(table, qt) {

  },

  insertTable(table, params) {

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

  },

  updateTable(table, params) {

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
          reject(res)
        })

    })

  },

  deleteTable(table, id) {

    return new Promise((resolve, reject) => {

      db.exec(`DELETE FROM ${table} WHERE id = $1`, [id])
        .then(response => {
          resolve()
        })
        .catch(err => {
          reject(err);
        })
    })
  }
}
