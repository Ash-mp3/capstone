//database
const client = require("../config/database");

//logger 
const logger = require("../config/logger")


async function getCourses(){
    try {

        const coursesQuery = `SELECT title, description, tuition_cost, credit_hours, maximum_capacity, schedule, classroom_number, class_id FROM classes`
        const coursesQueryResult = await client.query(coursesQuery)
        let courses = coursesQueryResult.rows



        await Promise.all(courses.map(async (course) => {
          const enrollmentNumQuery = `
          SELECT count(*) from enrollments where class_id = ${course.class_id}
          `;
          const numEnrolledResult = await client.query(enrollmentNumQuery);
          const numEnrolled = numEnrolledResult.rows[0].count
          course.spots_left = course.maximum_capacity-numEnrolled;
      }));

        //send formatted object
        return({status: 200, res: { courses: courses }})
      } catch (error) {
        logger.error(error);
        return({status: 500, res: "Error retrieving classes from database"})
      }
}

module.exports = getCourses