//imported modules
const express = require("express");
const adminRouter = express.Router();

//controllers
const getUserList = require("./adminControllers/getUserList");
const removeUser = require("./adminControllers/removeUser");
const addEnrollment = require("./adminControllers/addEnrollment")
const removeEnrollment = require("./adminControllers/removeEnrollment")

adminRouter.get('/userList', async(req, res) => {
    const result = await getUserList()
    res.status(result.status).json(result.res);
})


adminRouter.post('/removeUser', async(req, res) => {
    const user_id = req.body.user_id
    const result = await removeUser(user_id)
    res.status(200).json(result.msg)
})


adminRouter.put('/addEnrollment', async(req, res) => {
    const user_id = req.body.user_id
    const class_id = req.body.class_id
    const result = await addEnrollment(user_id, class_id)
    res.status(result.status).json(result.msg)
})

adminRouter.delete('/removeEnrollment', async(req, res) => {
    const user_id = req.body.user_id
    const class_id = req.body.class_id
    const result = await removeEnrollment(user_id, class_id)
    res.status(result.status).json(result.msg)
})

module.exports = adminRouter