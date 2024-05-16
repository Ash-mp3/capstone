const client = require("../../config/database");

const createCourse = async (CourseInfo) => {
	const createCourseQuery = `
        INSERT INTO classes (title, description, tuition_cost, credit_hours, maximum_capacity, schedule, classroom_number)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
	const result = await client.query(createCourseQuery, CourseInfo);
	if (result) {
		return { status: 201, msg: "Course created successfully!", success: true };
	}
};

module.exports = createCourse;
