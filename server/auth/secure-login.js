//imported modules
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const login = require("connect-ensure-login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//app config
const app = express();

//Environment variables
const secret = process.env.JWT_SECRET;

function secureLogIn(email, password) {
  //middleware configuration
  app.use(
    session({
      secret: "asdfasdf",
      saveUninitialized: false,
      resave: false,
    })
  );

  const token = jwt.sign({ email: email, password: password }, secret, {
    algorithm: "HS256",
    expiresIn: "5s",
  });

  return token;
}
module.exports = secureLogIn;
