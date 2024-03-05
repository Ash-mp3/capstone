//imported modules
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//database 
const { loginUser } = require("../models/loginUser");

//app config
const app = express();

//Environment variables
const secret = process.env.JWT_SECRET;

async function secureLogIn(email, password) {
  //middleware configuration
  const checkCredentials = await loginUser(email, password)
  const hashedPassword = checkCredentials; //we'll get this hashedPassword from the database. The password that created this hashedPassword is "123", so if you put that in as the password, the console will say "password is correct"
  console.log(hashedPassword)
  // passwordMatch = await bcrypt.compare(password, hashedPassword)
  await bcrypt.compare(password, hashedPassword, (error, result) => {
    if (error) {
      throw error
    } else if (result) {
        console.log('Password is correct');
    } else {
        console.log('Password is incorrect');
    }
});

  const token = jwt.sign({ email: email, password: password }, secret, {
    algorithm: "HS256",
    expiresIn: "60s",
  });

  return({status: 200, res:{token: token, loggedIn: true}});
}
module.exports = secureLogIn;
