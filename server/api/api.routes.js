//imported modules
const path = require("path");

const express = require("express");
const { stringify } = require("querystring");
const apiRouter = express.Router();
const app = express();
const { expressjwt } = require("express-jwt");

//code from other files
const secureLogIn = require("../auth/secure-login.js");
const client = require("../config/database");

//Environment variables
const secret = process.env.JWT_SECRET;



apiRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const token = secureLogIn(email, password);
  res.json({ loggedIn: true, token: token });
});

apiRouter.post("/signup", (req, res) => {
  const {
    username,
    email,
    first_name,
    last_name,
    phone_number,
    address,
    password,
    confirm_password,
  } = req.body

  console.log(username)
  console.log(email)
  console.log(username)
  console.log(username)
  console.log(username)
  console.log(username)
  console.log(username)
  res.json({ msg: 'success' })
});


//get courses from database
apiRouter.get(
  "/courses",
  expressjwt({ secret: secret, algorithms: ["HS256"] }),
  async (req, res) => {
    try {
      //select title and description from title and put them into one variable
      const Tresult = await client.query(`SELECT title FROM classes`);
      const Dresult = await client.query(`SELECT description FROM classes`);
      let realRes = [];
      Tresult.rows.forEach((row, index) => {
        realRes.push({
          title: row.title,
          description: Dresult.rows[index].description,
        });
      });
      //send formatted object
      res.json({ courses: realRes });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving classes from database");
    }
  }
);

module.exports = apiRouter;
