
const ApiError = require('./apiError.js');


const apiErrorHandler =(err,req,res,next) => {

  if(err instanceof ApiError){
    return res.status(err.code).json(err.message);
  }

  return res.status(500).json('F servidor');
}

module.exports = apiErrorHandler;
