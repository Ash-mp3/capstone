const client = require("../config/database");

async function findInfoById(id){
    const userQuery = `
    select username, email, first_name, last_name, phone_number, address, city, country, user_role
    from users
    where user_id='${id}';
    `
    const userResult = await client.query(userQuery)
    let info = userResult.rows[0]

    const coursesQuery = `
    SELECT classes.*
    FROM enrollments
    JOIN classes ON enrollments.class_id = classes.class_id
    WHERE enrollments.user_id = ${id};
    `
    const coursesResult = await client.query(coursesQuery)

    info.courses = coursesResult.rows
    return info
}
module.exports = findInfoById