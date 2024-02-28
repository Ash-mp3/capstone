//imported modules
const path = require("path");

const express = require('express');
const { stringify } = require("querystring");
const apiRouter = express.Router()
const app = express()
const { expressjwt } = require('express-jwt')


//code from other files
const secureLogIn = require('../auth/secure-login.js')
const client = require("../config/database");

//Environment variables
const secret = process.env.JWT_SECRET



apiRouter.get('/',(req, res) => {
    res.json({message: '/'})
})

apiRouter.post('/login', (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    const token = secureLogIn(email, password)
    res.json({loggedIn: true, token: token});
})

apiRouter.post('/signup', (req, res) => {
    
})

apiRouter.get('/courses', expressjwt({secret: secret, algorithms: ['HS256']}), (req, res) => {
    const courses = 
    [
        {
            title: '1',
            description: 'course 1'
        },
        {
            title: '2',
            description: 'course 2'
        },
        {
            title: '3',
            description: 'course 3'
        },
        {
            title: '4',
            description: 'course 4'
        },
        {
            title: '5',
            description: 'course 5'
        },
        {
            title: '6',
            description: 'course 6'
        },
        {
            title: '7',
            description: 'course 7'
        },
        {
            title: '8',
            description: 'course 8'
        },
        {
            title: '9',
            description: 'course 9'
        },
    ]
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