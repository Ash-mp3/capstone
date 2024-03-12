//imported modules
const express = require("express");
const adminRouter = express.Router();

//controllers
const getUserList = require("./adminControllers/getUserList");
const removeUser = require("./adminControllers/removeUser");

adminRouter.get('/userList', async(req, res) => {
    const result = await getUserList()
    res.status(result.status).json(result.res);
})


adminRouter.post('/removeUser', (req, res) => {
    const user_id = req.body.user_id
    const result = removeUser(user_id)
    res.status(200).json(result.msg)
})

module.exports = adminRouter