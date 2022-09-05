const genericQuerys = require('./genericQuerys.js');
const db = require('../config/dbconnect.js');

class ReviewRepository extends genericQuerys {
    static getByUserId = (userId) => {
        return new Promise((resolve, reject) => {
            db.exec(`SELECT * FROM reviews WHERE user_id = $1`, [userId])
                .then(result => resolve(result))
                .catch(error => reject(error));
        });
    }

    static getByUserAndProductId = (userId, reviewId) => {
        return new Promise((resolve, reject) => {
            db.exec("SELECT * FROM reviews WHERE user_id = $1 AND product_id = $2", [userId, reviewId])
                .then(result => result.length ? resolve(result[0]) : reject())
                .catch(error => reject(error));
        });
    }
}

module.exports = ReviewRepository;