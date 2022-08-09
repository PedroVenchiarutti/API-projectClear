const bcrypt = require("bcrypt");
const saltRounds = 10;

// gem hash from a password
exports.gemPassword = async(password) => {
  
  const hash = await bcrypt.hashSync(password, saltRounds);
  
  return hash;
}


exports.verifyPassword =async(password,hash) => {
  
  const compare = await bcrypt.compareSync(password,hash);

  return compare
}
