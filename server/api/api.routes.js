//imported modules
const path = require("path");
const express = require('express');
const { stringify } = require("querystring");
const apiRouter = express.Router()
const app = express()
const { expressjwt } = require('express-jwt')
const secret = 'something'


//code from other files
const secureLogIn = require('../auth/secure-login.js')
const client = require("../config/database");



apiRouter.get('/',(req, res) => {
    res.json({message: '/'})
})

apiRouter.post('/login', (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    const token = secureLogIn(email, password)
    res.json({loggedIn: true, token: token});
})

apiRouter.post('signup', (req, res) => {
    
})

apiRouter.get('/courses', expressjwt({secret: secret, algorithms: ['HS256']}), (req, res) => {
    const courses = [{title: '1'},{title: '2'},{title: '3'},]
    res.json({courses: courses})
})

//commented this out so I could test JWT
/* apiRouter.get("/courses", async (req, res) => {
  try {
    const results = await client.query(`SELECT title FROM classes`);
    console.log(typeof results.rows);
    let realRes = '';
    results.rows.forEach(row => {
      realRes = realRes + `${row.title}. `;
    })
    res.json(realRes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving classes from database");
  }
}); */ 

module.exports = apiRouter