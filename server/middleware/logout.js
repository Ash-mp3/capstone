//imported modules
const jwt = require('jsonwebtoken');

function logout(authorization){
  //we will want to put "authorization" inside of a token blacklist and delete it automatically after it expires

  const token = authorization.slice(7,authorization.length)
  const decodedToken = jwt.decode(token, { complete: true });

  const tokenExp = decodedToken.payload.exp //this is the expiration date of the token in unix time

  return({status: 200, res:{ loggedOut: true }})
}

module.exports = logout