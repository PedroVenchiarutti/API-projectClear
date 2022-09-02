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
}

module.exports = ReviewRepository;