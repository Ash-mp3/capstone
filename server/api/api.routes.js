const path = require("path");
const express = require('express');
const client = require("../config/database");
const { stringify } = require("querystring");
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