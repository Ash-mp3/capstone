//imported modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Environment variables
const secret = process.env.JWT_SECRET;

function secureLogIn(email, password) {
  //middleware configuration
  const hashedPassword = '$2b$10$l0KJsxTJQIxbTsCUAKvpgOqAfTqzAdV/Oa1nnNRFPbWJOWr0I4G.q' //we'll get this hashedPassword from the database. The password that created this hashedPassword is "123", so if you put that in as the password, the console will say "password is correct"
  bcrypt.compare(password, hashedPassword, (error, result) => {
    if (error) {
      throw error
    } else if (result) {
        console.log('Password is correct');
    } else {
        console.log('Password is incorrect');
    }
});

const id=12345678 //get the user id from the database

  const token = jwt.sign({id: id }, secret, {
    algorithm: "HS256",
    expiresIn: "10000s",
  });

  return({status: 200, res:{token: token, loggedIn: true}});
}
module.exports = secureLogIn;
