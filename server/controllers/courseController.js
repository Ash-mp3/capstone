//database
const client = require("../config/database");

async function getCourses(){
    try {
        //select title and description from title and put them into one variable
        const Tresult = await client.query(`SELECT title FROM classes`);
        const Dresult = await client.query(`SELECT description FROM classes`);
        let realRes = [];
        Tresult.rows.forEach((row, index) => {
          realRes.push({
            title: row.title,
            description: Dresult.rows[index].description,
          });
        });
        //send formatted object
        return({status: 200, res: JSON.stringify({ courses: realRes })})
      } catch (error) {
        console.error(error);
        return({status: 500, res: "Error retrieving classes from database"})
      }
}

module.exports = getCourses