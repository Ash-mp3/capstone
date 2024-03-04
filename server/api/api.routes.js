//imported modules
const path = require("path");

const express = require("express");
const { stringify } = require("querystring");
const apiRouter = express.Router();
const { expressjwt } = require("express-jwt");
const jwt = require('jsonwebtoken');

//code from other files
const secureLogIn = require("../auth/secure-login.js");
const client = require("../config/database");
const { insertUser } = require("../models/userModel.js");
const { sendToken } = require("../models/tokenBlackList.js");

//Environment variables
const secret = process.env.JWT_SECRET;


apiRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  const token = secureLogIn(email, password);
  res.json({ loggedIn: true, token: token });
})
apiRouter.post("/logout", expressjwt({ secret: secret, algorithms: ["HS256"] }), (req, res) => {

  //we will want to put this "authorization" constant inside of a token blacklist and delete it automatically after it expires
  const authorization = req.headers.authorization;
  const token = authorization.slice(7,authorization.length)
  const decodedToken = jwt.decode(token, { complete: true });
  const tokenExp = decodedToken.payload.exp //this is the expiration date of the token

  sendToken(token, tokenExp);

  res.json({ loggedOut: true });
})


//send user sign in info to database
apiRouter.post("/signup", async (req, res) => {
  try {
    const userData = []
    for (const key in req.body) {
      userData.push(req.body[key])
    };
    const confirmMsg = await insertUser(userData);
    res.json({ msg: confirmMsg });
  } catch(err) {
    console.error(err)
    res.status(500).json({ message: "Error creating user" });
  }
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

module.exports = apiRouter
