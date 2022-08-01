const db = require('../config/dbconnect.js');

module.getAll = (id = "") => {

  return new Promise((resolve, reject) => {

    const query = ` 
      SELECT b.id,b.value ,u."name" FROM buys AS b 
	      JOIN requests AS r ON r.id = b.request_id 
	      JOIN users AS u ON u.id = r.user_id `;

    query += id ? 'WHERE b.id = $1;' : '';

    let param = [];

    param = id ? param.push(id) : param;

    db.exec(query, param)
      .then(buys => {
        res.send(buys);
      }, (e) => {
        next(apiError.badRequest(e.message))
      })

  })

}
