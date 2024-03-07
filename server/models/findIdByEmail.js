const client = require("../config/database");

async function findIdByEmail(email){
    const query= `select user_id from users where email='${email}'`
    const result = await client.query(query)
    const userId = result.rows[0].user_id
    return userId
}

module.exports = findIdByEmail