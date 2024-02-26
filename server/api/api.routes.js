const path = require("path");
const express = require('express')
const apiRouter = express.Router()
const app = express()

const fs = require('fs')

app.use(express.static(path.resolve(__dirname, "../../client/src/components")));


apiRouter.get('/',(req, res) => {
    const file = fs.readFileSync(path.resolve(__dirname, '../../client/src/components/login.jsx'), 'utf-8')
    console.log(file)
    res.json({content:file});
})

apiRouter.post('/login', (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    res.json({ message: "login request", loggedIn: true });
})

module.exports = apiRouter