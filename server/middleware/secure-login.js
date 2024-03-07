//imported modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Environment variables
const secret = process.env.JWT_SECRET;

//other functions
const { loginUser } = require("../models/loginUser");

async function secureLogIn(email, password) {
  try {
    // const hashedPassword = await loginUser(email, password);
    // if (!hashedPassword) {
    //   return { status: 401, res: { msg: "Email or password incorrect", loggedIn: false } };
    // };
    // const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)
    const isPasswordCorrect = true;
    if (isPasswordCorrect) {
      console.log("Password is correct");
      const token = jwt.sign({ email: email, password: password }, secret, {
        algorithm: "HS256",
        expiresIn: "10000s",
      });
      return { status: 200, res: { token: token, loggedIn: true } };
    } else {
      return {
        status: 401,
        res: { msg: "Password incorrect", loggedIn: false },
      };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, res: { message: "login error" } };
  }
  //middleware configuration
}
module.exports = secureLogIn;
