const client = require("../config/database")

const loginUser = async (email, password) => {
    const loginQuery = `select * from users where email = '${email}'`
    const login = await client.query(loginQuery);
    if (login.rowCount === 1) {
        return `${login.rows[0].password}`
    } else {
        return false
    }
}

module.exports = { loginUser }