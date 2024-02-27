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
    secureLogIn({ email, password })
    res.json({loggedIn: true});
})

apiRouter.post('signup', (req, res) => {
    
})

apiRouter.post('/courses', (req, res) => {
    const courses = [{title: '1'},{title: '2'},{title: '3'},]
    res.json(courses)
})

module.exports = apiRouter