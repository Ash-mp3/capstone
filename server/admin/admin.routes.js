//imported modules
const express = require("express");
const { expressjwt } = require("express-jwt");
const secret = process.env.JWT_SECRET;
const adminRouter = express.Router();


//controllers
const getUserList = require("./adminControllers/getUserList");
const removeUser = require("./adminControllers/removeUser");
const addEnrollment = require("./adminControllers/addEnrollment");
const removeEnrollment = require("./adminControllers/removeEnrollment");
const createCourse = require("./adminControllers/createCourse");
const createUser = require("./adminControllers/createUser");
const editCourse = require("./adminControllers/editCourse");
const deleteCourse = require("./adminControllers/deleteCourse");

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
    res.status(200).json(result.msg)
})

adminRouter.post("/createCourse", expressjwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
    const courseInfo = Object.values(req.body);
    const result = await createCourse(courseInfo)
    res.status(result.status).send({msg: result.msg, success: result.success});
})

adminRouter.post("/createUser", expressjwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
    const userInfo = Object.values(req.body);
    const result = await createUser(userInfo)
    res.status(result.status).send({msg: result.msg, success: result.success});
})

adminRouter.delete("/deleteCourse", expressjwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
    const courseId = req.body.class_id;
    console.log(courseId)
    const result = await deleteCourse(courseId)
    res.status(result.status).send({msg: result.msg, success: result.success});
})

adminRouter.post("/editCourse", expressjwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
    const courseInfo = req.body
    delete courseInfo['spots_left'];
    const result = await editCourse(courseInfo)
    res.status(result.status).send({msg: result.msg, success: result.success});
})

module.exports = adminRouter