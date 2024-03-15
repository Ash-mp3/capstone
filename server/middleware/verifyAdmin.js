const jwt = require('jsonwebtoken')
//logger
const logger = require("../config/logger")

function verifyAdmin(req, res, next){
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = auth.slice(7);
    const user_role = jwt.decode(token).user_role;

    if (user_role === 'admin') {
        next();
    } else {
        logger.error("User is not authorized to access this resource")
        return res.status(403).json({ error: 'Forbidden: You are not authorized to access this resource.' });
    }
}

module.exports = verifyAdmin