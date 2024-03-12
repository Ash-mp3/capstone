const client = require("../config/database");

const updateUser = async (userId, userInfo) => {
    let updateStatus;
    const getUserQuery = `SELECT username, email, first_name, last_name, phone_number, address, city, country FROM users WHERE user_id = ${userId}`
    const result = await client.query(getUserQuery)
    const dbResult = result.rows[0]
    for (const key in dbResult) {
        if (dbResult[key] !== userInfo[key]) {
            console.log(key, userInfo[key])
            const updateResult = await client.query(`UPDATE users SET ${key} = '${userInfo[key]}' WHERE user_id = ${userId}`);
            updateStatus = true;
        } 
    }
    if (updateStatus) {
        return({status: 201, msg: 'Updated user info successfully!'})
    } else {
        return({status: 202, msg: 'There was no new info to update.'})
    }
    
}

module.exports = updateUser