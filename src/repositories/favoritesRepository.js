const genericQuerys = require('./genericQuerys.js');
const { exec } = require('../config/dbconnect.js');

class favoritesRepository extends genericQuerys {
    static getByUserId = (userId) => new Promise((resolve, reject) => {
        exec(`SELECT * FROM favorites WHERE user_id = $1`, [userId])
            .then(result => resolve(result))
            .catch(error => reject(error));
    });

    static getByUserAndProductId = (userId, reviewId) => new Promise((resolve, reject) => {
        exec("SELECT * FROM favorites WHERE user_id = $1 AND product_id = $2", [userId, reviewId])
            .then(result => result.length ? resolve(result[0]) : reject())
            .catch(error => reject(error));
    });
}

module.exports = favoritesRepository;