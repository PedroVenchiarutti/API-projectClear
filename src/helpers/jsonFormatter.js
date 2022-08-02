const formater = (mainArray, midTable, secondArray, users) => {

  let list = [];

  mainArray.forEach(main => {

    let elements = [];

    let mainUser = null;

    users.forEach(user => {

      if (main.user_id === user.id) {
        mainUser = user;
      }
    })

    midTable.forEach(mid => {

      secondArray.forEach(second => {

        if (mid.request_id) {
          if (mid.product_id == second.id && mid.request_id == main.id) {

            second.qt = mid.qt_product;

            elements.push(second)
            
          }
        } else if (mid.procedure_id) {
          
          if (mid.procedure_id == second.id && mid.reservation_id == main.id) {
            elements.push(second);
          }
        }
      });
    })

    if (midTable[0].reservation_id) {

      list.push({
        reservation: main,
        user: mainUser,
        procedures: elements
      })
    } else {

      list.push({
        date:main.date,
        user:mainUser,
        products: elements
      })
    }
    
    elements = []
  })

  return list;
}

module.exports = formater
