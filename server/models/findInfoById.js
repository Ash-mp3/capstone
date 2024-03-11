const client = require("../config/database");

async function findInfoById(id){
    const query = `
    select username, email, first_name, last_name, user_role
    from users
    where user_id='${id}';
    `
    const result = await client.query(query)
    let info = result.rows[0]
    info.courses = ["course1", "course2", "course3"] // get the courses from the database
    return info
}
module.exports = findInfoById