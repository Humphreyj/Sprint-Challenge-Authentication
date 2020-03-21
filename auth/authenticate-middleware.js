/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const secrets = require('../config/secrets')
const jwt = require('jsonwebtoken')
function restrict(){
  return (req, res, next) => {
  try {
    const token = req.headers.authorization
    if(!token) {
      res.status(401).json({message:' You are not authorized'})
    }
    jwt.verify(token, secrets.jwtSecret, (err, decoded) => {
      if(err) {
        return res.status(401).json({message:' You are not authorized'})
      }
      req.token = decoded
      console.log(decoded)
      next()
    })
  }catch(err) {
    next(err)
  }
}
}

module.exports = restrict