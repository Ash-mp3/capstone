const client = require("../../config/database")
async function getUserList(){
    const status = 200
    const userListQuery = `
    select username, email, first_name, last_name, phone_number, address, city, country, user_role, user_id
    from users
    `
    const usersResult = await client.query(userListQuery)
    let users = usersResult.rows

    await Promise.all(users.map(async (user) => {
        const courseListQuery = `
            SELECT classes.*
            FROM enrollments
            JOIN classes ON enrollments.class_id = classes.class_id
            WHERE enrollments.user_id = ${user.user_id};
        `;
        const coursesResult = await client.query(courseListQuery);
        user.courses = coursesResult.rows;
    }));


    return({status: status, res: users})
}

module.exports = getUserList