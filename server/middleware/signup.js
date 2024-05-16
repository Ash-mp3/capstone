//imported modules
const bcrypt = require("bcrypt");

//logger
const logger = require("../config/logger.js");

//database
const { insertUser } = require("../models/userModel.js");

//middleware
const checkLoginInfo = require("./checkLoginInfo.js");

async function createSaltedPassword(plaintextPassword) {
	const saltRounds = 10;
	try {
		const hashedPassword = await bcrypt.hash(plaintextPassword, saltRounds);
		return hashedPassword;
	} catch (error) {
		logger.error(error);
		throw error; // Rethrow the error for handling in the calling function
	}
}

const signUp = async (info) => {
	const isValidInfo = checkLoginInfo(info);
	if (isValidInfo) {
		try {
			const password = info.password;
			const saltedPassword = await createSaltedPassword(password);

			const userData = [];
			for (const key in info) {
				userData.push(info[key]);
			}
			userData[8] = saltedPassword;
			const confirmMsg = await insertUser(userData);
			return { status: 200, res: { msg: confirmMsg } };
		} catch (error) {
			logger.error(error);
			return { status: 500, res: { msg: "Error creating user" } };
		}
	} else {
		return { status: 400, res: { msg: "Fields are not valid" } };
	}
};

module.exports = signUp;
