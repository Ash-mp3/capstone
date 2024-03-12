const client = require("../../config/database")
async function removeUser(user_id){
    console.log(`remove user ${user_id}`)
    const removeUserQuery = `DELETE FROM users WHERE user_id = ${user_id}`
    await client.query(removeUserQuery)
    return({msg: "success"})
}

module.exports=removeUser