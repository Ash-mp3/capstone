const client = require("../../config/database");

async function removeEnrollment(user_id, class_id) {
	const removeEnrollmentQuery = `
    delete from enrollments 
    where user_id = ${user_id} and 
    class_id = ${class_id}`;
	client.query(removeEnrollmentQuery);
	return { status: 201, msg: "Successfully removed enrollment" };
}

module.exports = removeEnrollment;
