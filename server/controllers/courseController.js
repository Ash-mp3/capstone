//database
const client = require("../config/database");

async function getCourses(){
    try {

        const coursesQuery = `SELECT title, description, class_id, tuition_cost FROM classes`
        const queryResult = await client.query(coursesQuery)

        //send formatted object
        return({status: 200, res: JSON.stringify({ courses: queryResult.rows })})
      } catch (error) {
        console.error(error);
        return({status: 500, res: "Error retrieving classes from database"})
      }
}

module.exports = getCourses