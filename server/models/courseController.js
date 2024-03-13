//database
const client = require("../config/database");

async function getCourses(){
    try {

        const coursesQuery = `SELECT title, description, class_id, tuition_cost, credit_hours, maximum_capacity FROM classes`
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
        console.error(error);
        return({status: 500, res: "Error retrieving classes from database"})
      }
}

module.exports = getCourses