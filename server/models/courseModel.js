//INSERT INTO user_classes (user_id, class_id) VALUES ({num}, {num});
const client = require('../config/database')

async function addClass(user_id, class_id){
    const checkForDuplicatesQuery = `select class_id from enrollments where user_id = ${user_id} and class_id=${class_id}`
    const duplicates = await client.query(checkForDuplicatesQuery)
    if(duplicates.rowCount > 0){
        return({status: 200, msg: 'you are already enrolled in that class'})
    }
    const addClassQuery = `INSERT INTO enrollments (user_id, class_id) VALUES (${user_id}, ${class_id})`
    client.query(addClassQuery)
        return({status: 200, msg: 'succesfully added class'})
}

module.exports = addClass

