const path = require("path");
const express = require('express')
const apiRouter = express.Router()
const app = express()

app.use(express.static(path.resolve(__dirname, "./../client/src/components")));

apiRouter.get('/',(req, res) => {
    const file = path.join(__dirname, "../../client/src/components/Login");
    console.log('file' ,file)
    res.send(file);
})

apiRouter.post('/login', (req, res) => {
    const { username, password } = req.body
    console.log(req.body)
    res.json({ message: "login request", loggedIn: true });
})

module.exports = apiRouter