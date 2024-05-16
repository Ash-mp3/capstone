//imported modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//logger
const logger = require("../config/logger.js");

//Environment variables
const secret = process.env.JWT_SECRET;

//other functions
const { loginUser } = require("../models/loginUser");
const findInfoById = require("../models/findInfoById.js");
const findIdByEmail = require("../models/findIdByEmail.js");

async function secureLogIn(email, password) {
	try {
		const hashedPassword = await loginUser(email, password);
		if (!hashedPassword) {
			return { status: 401, res: { msg: "Email or password incorrect", loggedIn: false } };
		}
		const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
		if (isPasswordCorrect) {
			const id = await findIdByEmail(email);

			const info = await findInfoById(id);
			const user_role = info.user_role;

			const token = jwt.sign({ id: id, user_role: user_role }, secret, {
				algorithm: "HS256",
				expiresIn: "10000s",
			});
			return { status: 200, res: { token: token, loggedIn: true, user_role: user_role } };
		} else {
			return {
				status: 401,
				res: { msg: "Password incorrect", loggedIn: false },
			};
		}
	} catch (error) {
		logger.error(error);
		return { status: 500, res: { message: "login error" } };
	}
	//middleware configuration
}
module.exports = secureLogIn;
