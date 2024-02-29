const client = require('../config/database')



const addUserQuery = `
    INSERT INFO users (username, email, first_name, last_name, phone_number, address, password)
        VALUES ${userInfo}
`