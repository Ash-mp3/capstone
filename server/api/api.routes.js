const express = require('express')
const apiRouter = express.Router()


apiRouter.get('/',(req, res) => {
    res.json({ message: "Hello from server!" });
})

apiRouter.post('/login', (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    res.json({ message: "login request", loggedIn: true });
})

module.exports = apiRouter