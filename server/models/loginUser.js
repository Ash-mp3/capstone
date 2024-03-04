const client = require("../config/database")

const loginUser = async (email, password) => {
    const loginQuery = `
        select * from users where email = '${email}' and password = '${password}'
    `
    const login = await client.query(loginQuery);
    if (login.rowCount === 1) {
        return true
    } else {
        return false
    }
}

module.exports = { loginUser }