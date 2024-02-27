//imported modules
const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const login = require("connect-ensure-login");
const bcrypt = require("bcryptjs");

const app = express()

function secureLogIn(){
    
//middleware configuration
app.use(
    session({
      secret: "asdfasdf",
      saveUninitialized: false,
      resave: false,
    })
  );

console.log('log in')
}
module.exports=secureLogIn

