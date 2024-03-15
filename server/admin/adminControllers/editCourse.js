const client = require("../../config/database")

const editCourse = async (courseInfo) => {
    let updateStatus;
    const getCourseQuery = `SELECT title, description, tuition_cost, credit_hours, maximum_capacity, schedule, classroom_number, class_id FROM classes WHERE class_id = ${courseInfo.class_id}`
    const result = await client.query(getCourseQuery)
    const dbResult = result.rows[0]
    for (const key in dbResult) {
        if (dbResult[key] !== courseInfo[key]) {
            const updateResult = await client.query(`UPDATE classes SET ${key} = '${courseInfo[key]}' WHERE class_id = ${courseInfo.class_id}`);
            if (updateResult) {
                updateStatus = true;
            } 
        } 
    }
    if (updateStatus) {
        return({status: 201, msg: 'Updated course info successfully!'})
    } else {
        return({status: 202, msg: 'There was no new info to update.'})
    }
}

module.exports = editCourse