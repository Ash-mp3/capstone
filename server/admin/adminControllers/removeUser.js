const client = require("../../config/database")
async function removeUser(user_id){
    const removeUserQuery = `DELETE FROM users WHERE user_id = ${user_id}`
    await client.query(removeUserQuery)

    const removeEnrollmentsQuery = `delete from enrollments where user_id = ${user_id}`
    client.query(removeEnrollmentsQuery)
    return({msg: "success"})
}

module.exports=removeUser