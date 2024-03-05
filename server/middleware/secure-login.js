//imported modules
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//app config
const app = express();

//Environment variables
const secret = process.env.JWT_SECRET;

//other functions
const { loginUser } = require("../models/loginUser");

async function secureLogIn(email, password) {
  try {
    const hashedPassword = await loginUser(email, password); //we'll get this hashedPassword from the database. The password that created this hashedPassword is "123", so if you put that in as the password, the console will say "password is correct"
    const isPasswordCorrect = bcrypt.compare(password, hashedPassword);
    console.log(isPasswordCorrect);
    if (isPasswordCorrect) {
      console.log("Password is correct");
      const token = jwt.sign({ email: email, password: password }, secret, {
        algorithm: "HS256",
        expiresIn: "10000s",
      });
    } else {
      console.log("Password is incorrect");
      return { status: 401, res: { message: "password incorrect" } };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, res: { message: "login error" } };
  }
  //middleware configuration
}
module.exports = secureLogIn;
