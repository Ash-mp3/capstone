//INSERT INTO user_classes (user_id, class_id) VALUES ({num}, {num});
const client = require("../config/database");

//middleware
const schedulesConflict = require("../middleware/checkSchedule")

async function addClass(user_id, class_id) {
	const checkForDuplicatesQuery = `select class_id from enrollments where user_id = ${user_id} and class_id=${class_id}`;
	const duplicates = await client.query(checkForDuplicatesQuery);
	if (duplicates.rowCount > 0) {
		return { status: 200, msg: "you are already enrolled in that class" };
	}



	const classesQuery = `
		SELECT classes.*
		FROM classes
		INNER JOIN enrollments ON classes.class_id = enrollments.class_id
		WHERE enrollments.user_id = ${user_id};
	`;
	const classesResult = await client.query(classesQuery)
	const oldCourses = classesResult.rows

	const classQuery = `SELECT * from classes where class_id = ${class_id}`
	const classResult = await client.query(classQuery)
	const newCourse = classResult.rows[0]

	const conflictResult = schedulesConflict(newCourse, oldCourses)
	if(conflictResult.conflict){
		return { status: 400, msg: `schedule conflicts with ${conflictResult.conflictingCourse.title}` };
	}

	const addClassQuery = `INSERT INTO enrollments (user_id, class_id) VALUES (${user_id}, ${class_id})`;
	client.query(addClassQuery);
	return { status: 200, msg: "succesfully added class" };
}

module.exports = addClass;
