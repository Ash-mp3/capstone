const client = require("../../config/database")
function getUserList(){
    const status = 200
    const res = [1,2,3]
    return({status: status, res: res})
}

module.exports = getUserList