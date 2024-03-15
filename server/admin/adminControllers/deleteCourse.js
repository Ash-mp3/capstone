const client = require("../../config/database")

const deleteCourse = async (courseId) => {
    const deleteCourseQuery =`
        DELETE FROM classes WHERE class_id = ${courseId};
    `
    const result = await client.query(deleteCourseQuery);
    if (result) {
        return { status: 200, msg: "Course deleted successfully!", success: true };
    }
}

module.exports = deleteCourse