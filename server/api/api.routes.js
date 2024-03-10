//imported modules
const express = require("express");
const apiRouter = express.Router();
const { expressjwt } = require("express-jwt");

//middleware
const secureLogIn = require("../middleware/secure-login.js");
const logout = require("../middleware/logout.js");
const signup = require("../middleware/signup.js");

//controllers
const getCourses = require("../controllers/courseController.js");

//Environment variables
const secret = process.env.JWT_SECRET;

//responds with a jwt and a logged in status
apiRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await secureLogIn(email, password);
  res.status(result.status).json(result.res);
});

//responds with a logged out status
apiRouter.post(
  "/logout",
  expressjwt({ secret: secret, algorithms: ["HS256"] }),
  async (req, res) => {
    const authorization = req.headers.authorization;
    const result = logout(authorization);
    res.status(result.status).json(result.res);
  }
);

//send user sign in info to database
apiRouter.post("/signup", async (req, res) => {
  const info = req.body;
  const result = await signup(info);
  res.status(result.status).json(result.res);
});

//get courses from database
apiRouter.get(
  "/courses",
  expressjwt({ secret: secret, algorithms: ["HS256"] }),
  async (req, res) => {
    const result = await getCourses();
    res.status(result.status).json(JSON.parse(result.res));
  }
);

module.exports = apiRouter;
