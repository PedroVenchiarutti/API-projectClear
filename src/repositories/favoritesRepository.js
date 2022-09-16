const genericQuerys = require('./genericQuerys.js');
const productsRepository = require('./productRepository');
const { exec } = require('../config/dbconnect.js');

const getFavoriteProducts = favorite => new Promise((resolve, reject) => {
    productsRepository.select("products", favorite.product_id)
        .then(results => {
            const product = results[0];
            resolve({
                ...favorite,
                product: {
                    url_img: product.url_img,
                    name: product.name,
                    value: product.value,
                    offer: product.offer
                }
            });
        })
        .catch(error => reject(error));
});

class favoritesRepository extends genericQuerys {
    static getByUserId = async (userId) => new Promise((resolve, reject) => {
        exec(`SELECT * FROM favorites WHERE user_id = $1`, [userId])
            .then(async results => {
                const products = [];
                for await (const favorite of results) products.push(await getFavoriteProducts(favorite));
                resolve(products);
            })
            .catch(error => reject(error));
    });

    static getByUserAndProductId = (userId, reviewId) => new Promise((resolve, reject) => {
        exec("SELECT * FROM favorites WHERE user_id = $1 AND product_id = $2", [userId, reviewId])
            .then(result => result.length ? resolve(result[0]) : reject())
            .catch(error => reject(error));
    });
}

module.exports = favoritesRepository;
