//db
const client = require("../config/database");

//logger
const logger = require("../config/logger");

//bcrypt
const bcrypt = require("bcrypt");

const updateUser = async (userId, userInfo) => {
	let updateStatus;
	const getUserQuery = `SELECT username, email, first_name, last_name, phone_number, address, city, country, password FROM users WHERE user_id = ${userId}`;
	const result = await client.query(getUserQuery);
	const dbResult = result.rows[0];
	let hashedPassword = dbResult.password;
	const PasswordIsTheSame = await bcrypt.compare(userInfo.password, hashedPassword);
	if (!PasswordIsTheSame && userInfo.password !== "") {
		hashedPassword = await bcrypt.hash(userInfo.password, 10);
	}
	userInfo.password = hashedPassword;
	for (const key in dbResult) {
		if (dbResult[key] !== userInfo[key] && userInfo[key].trim() !== "") {
			let updateResult;
			logger.log(key, userInfo[key]);
			if (key === "password") {
				updateResult = await client.query(`UPDATE users SET password = '${hashedPassword}' WHERE user_id = ${userId}`);
			}
			updateResult = await client.query(`UPDATE users SET ${key} = '${userInfo[key]}' WHERE user_id = ${userId}`);
			if (updateResult) {
				updateStatus = true;
			}
		}
	}
	if (updateStatus) {
		return { status: 201, msg: "Updated user info successfully!", success: true };
	} else {
		return { status: 202, msg: "There was no new info to update.", success: false };
	}
};

module.exports = updateUser;
