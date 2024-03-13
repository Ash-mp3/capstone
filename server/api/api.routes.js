//imported modules
const express = require("express");
const apiRouter = express.Router();
const { expressjwt } = require("express-jwt");
const jwt = require('jsonwebtoken')

//middleware
const secureLogIn = require("../middleware/secure-login.js");
const logout = require("../middleware/logout.js");
const signup = require("../middleware/signup.js");
const verifyAdmin = require("../middleware/verifyAdmin.js")
const adminRouter = require("../admin/admin.routes.js")

//database
const findInfoById = require("../models/findInfoById.js")
const addClass = require("../models/courseModel.js")
const updateUser = require("../models/updateUser.js")

//controllers
const getCourses = require("../models/courseController.js");
const getEnrolledCourses = require("../models/getEnrolledCourses.js")

//Environment variables
const secret = process.env.JWT_SECRET;

//admin routes
apiRouter.use(
  "/admin",
  expressjwt({ secret: secret, algorithms: ["HS256"] }),
  verifyAdmin,
  adminRouter
 )

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
    const auth = req.headers.authorization
    const token = auth.slice(7, auth.length)
    const userId = jwt.decode(token).id

    const coursesResult = await getCourses();
    const enrolledResult = await getEnrolledCourses(userId)

    const result = {
      status: 200,
       res: {
        courses: coursesResult.res.courses,
        enrolledCourses:enrolledResult.res.enrolledCourses
      }
    }
    console.log(result)
    res.status(result.status).json(result.res);
  }
);

//get user's enrolled 
apiRouter.get("/profileInfo", expressjwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  const auth = req.headers.authorization
  const token = auth.slice(7, auth.length)
  const userId = jwt.decode(token).id
  const userInfo = await findInfoById(userId)
  //use userId to find user info in database
  res.status(200).json(userInfo)
})

apiRouter.post("/updateUser", expressjwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
  const userInfo = req.body;
  const auth = req.headers.authorization
  const token = auth.slice(7, auth.length)
  const userId = jwt.decode(token).id
  const result = await updateUser(userId, userInfo)
  console.log(result)
  res.status(result.status).send({msg: result.msg});
})

apiRouter.post(
  "/addClass", expressjwt({ secret: secret, algorithms: ["HS256"] }), async (req, res) => {
    const classId = req.body.class_id
    const auth = req.headers.authorization
    const token = auth.slice(7, auth.length)
    const userId = jwt.decode(token).id
    const result = await addClass(userId, classId);
    res.status(result.status).send({msg: result.msg});
  }
);

module.exports = apiRouter
