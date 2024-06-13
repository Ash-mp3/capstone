const client = require("../../config/database");

const createCourse = async (CourseInfo) => {
	if(CourseInfo[0] === ""){
		return { status: 400, msg: "Must specify a title"}
	} else if(CourseInfo[1] === ""){
		return { status: 400, msg: "Must specify a description"}
	} else if(Number(CourseInfo[2]) === NaN || Number(CourseInfo[2]) <= 0){
		return { status: 400, msg: "Tuition cost must be a positive number"}
	} else if(Number(CourseInfo[3]) === NaN || Number(CourseInfo[3]) <= 0){
		return { status: 400, msg: "Credit hours must be a positive number"}
	} else if(Number(CourseInfo[4]) === NaN || Number(CourseInfo[4]) <= 0){
		return { status: 400, msg: "Maximum capacity must be a positive number"}
	} else if(CourseInfo[5] === ""){
		return { status: 400, msg: "Schedule must be specified"}
	} else if(CourseInfo[6] === ""){
		return { status: 400, msg: "Classroom number must me specified"}
	}
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
