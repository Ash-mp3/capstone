//db
const client = require("../config/database");

//logger
const logger = require("../config/logger")

async function getEnrolledCourses(user_id){
    try{
        const enrolledCoursesQuery = `select class_id from enrollments where user_id = ${user_id}`
        const enrolledCoursesResult = await client.query(enrolledCoursesQuery)
        const enrolledCourses = enrolledCoursesResult.rows
        return({status: 200, res: { enrolledCourses: enrolledCourses }})
    } catch (error) {
    logger.error(error);
    return({status: 500, res: "Error retrieving classes from database"})
    }
}

module.exports = getEnrolledCourses