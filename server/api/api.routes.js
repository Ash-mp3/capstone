const path = require("path");
const express = require('express');
const client = require("../config/database");
const { stringify } = require("querystring");
const apiRouter = express.Router()


//code from other files
const secureLogIn = require('../auth/secure-login.js')

apiRouter.use(express.static(path.join(__dirname, "../client/dist")));

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

apiRouter.get("/courses", async (req, res) => {
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
});

module.exports = apiRouter