const client = require("../config/database");

async function removeClass(user_id, class_id){
    try{
        const removeClassQuery = `
        delete from enrollments where user_id = ${user_id} and class_id = ${class_id}
        `
        const removedClass = await client.query(removeClassQuery)
        if(removedClass.rowCount > 0){
            return({status: 200, res: { msg: "class removed" }})
        } else {
            return({status: 200, res: { msg: "class already removed" }})
        }
    } catch (error) {
        console.error(error);
        return({status: 500, res: "Error retrieving classes from database"})
    }
}

module.exports = removeClass