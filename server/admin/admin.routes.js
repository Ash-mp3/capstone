//imported modules
const express = require("express");
const adminRouter = express.Router();

//controllers
const getUserList = require("./adminControllers/getUserList")

adminRouter.get('/userList', (req, res) => {
    const result = getUserList()
    res.status(result.status).json(result.res);
})


adminRouter.post('/removeUser', () => {
    console.log('hello from admin')
})

module.exports = adminRouter