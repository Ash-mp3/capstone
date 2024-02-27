const path = require("path");
const express = require('express')
const apiRouter = express.Router()
const app = express()

//code from other files
const secureLogIn = require('../auth/secure-login.js')


apiRouter.get('/',(req, res) => {
    res.json({message: '/'})
})

apiRouter.post('/login', (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    secureLogIn()
    res.json({loggedIn: true});
})

module.exports = apiRouter