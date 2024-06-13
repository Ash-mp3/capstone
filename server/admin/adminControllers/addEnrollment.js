const client = require("../../config/database");

const schedulesConflict = require("../../middleware/checkSchedule")

async function addEnrollment(user_id, class_id) {
	const classCapacityQuery = `select * from classes where class_id = ${class_id}`;
	const classQueryResult = await client.query(classCapacityQuery);
	const classResult = classQueryResult.rows
	const classCapacity = classResult[0].maximum_capacity;

	const classEnrollmentQuery = `select count(*) from enrollments where class_id = ${class_id}`;
	const classEnrollmentResult = await client.query(classEnrollmentQuery);
	const classEnrollment = parseInt(classEnrollmentResult.rows[0].count);

	const spots_left = classCapacity - classEnrollment;
	if (spots_left > 0) {
		const userClassesQuery = `		
			SELECT classes.*
			FROM classes
			INNER JOIN enrollments ON classes.class_id = enrollments.class_id
			WHERE enrollments.user_id = ${user_id}
		`;
		const userClassesResult = await client.query(userClassesQuery);
		const userClasses = userClassesResult.rows;

		let classDuplicates = false;
		const classConflict = schedulesConflict(classResult[0], userClasses)
		userClasses.forEach((row) => {
			if (parseInt(row.class_id) === parseInt(class_id)) {
				classDuplicates = true;
			}
		});
		if (classDuplicates) {
			return { status: 409, msg: `That user is already enrolled in ${classResult[0].title}` };
		} else if(classConflict.conflict){
			return { status: 409, msg: `${classResult[0].title} conflicts with ${classConflict.conflictingCourse.title}` };
		} else {
			const addEnrollmentQuery = `INSERT INTO enrollments (user_id, class_id) VALUES (${user_id}, ${class_id})`;
			client.query(addEnrollmentQuery);
			return { status: 201, msg: `successfully enrolled student in ${classResult[0].title}` };
		}
	} else {
		return { status: 409, msg: `${classResult[0].title} is full` };
	}
}

module.exports = addEnrollment;
