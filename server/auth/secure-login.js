//imported modules
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const login = require("connect-ensure-login");
const bcrypt = require("bcryptjs");

const jwt = require('jsonwebtoken')
const secret = 'something'

const app = express()

function secureLogIn( email, password ){
    
//middleware configuration
  app.use(
    session({
      secret: "asdfasdf",
      saveUninitialized: false,
      resave: false,
    })
  );

  console.log(`email: ${email}`)
  console.log(`password: ${password}`)
  const token = jwt.sign({ email: email, password: password }, secret, {
    algorithm: "HS256",
    expiresIn: "5s",
  });

  return token;
}
module.exports=secureLogIn

