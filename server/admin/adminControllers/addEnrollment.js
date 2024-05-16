const client = require("../../config/database");

async function addEnrollment(user_id, class_id) {
	const classCapacityQuery = `select maximum_capacity from classes where class_id = ${class_id}`;
	const classCapacityResult = await client.query(classCapacityQuery);
	const classCapacity = classCapacityResult.rows[0].maximum_capacity;

	const classEnrollmentQuery = `select count(*) from enrollments where class_id = ${class_id}`;
	const classEnrollmentResult = await client.query(classEnrollmentQuery);
	const classEnrollment = parseInt(classEnrollmentResult.rows[0].count);

	const spots_left = classCapacity - classEnrollment;
	if (spots_left > 0) {
		const userClassesQuery = `select class_id from enrollments where user_id =${user_id}`;
		const userClassesResult = await client.query(userClassesQuery);
		const userClasses = userClassesResult.rows;

		let classDuplicates = false;
		userClasses.forEach((row) => {
			if (parseInt(row.class_id) === parseInt(class_id)) {
				classDuplicates = true;
			}
		});
		if (classDuplicates) {
			return { status: 409, msg: "That user is already enrolled in that class" };
		} else {
			const addEnrollmentQuery = `INSERT INTO enrollments (user_id, class_id) VALUES (${user_id}, ${class_id})`;
			client.query(addEnrollmentQuery);
			return { status: 201, msg: "successfully enrolled student" };
		}
	} else {
		return { status: 409, msg: "that class is full" };
	}
}

module.exports = addEnrollment;
