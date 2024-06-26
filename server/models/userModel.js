//db
const client = require("../config/database");

//logger
const logger = require("../config/logger");

const insertUser = async (userData) => {
	try {
		const checkDoupQuery = `
            SELECT * FROM users WHERE email = '${userData[1]}'
        `;
		const addUserQuery = `
          INSERT INTO users (username, email, first_name, last_name, phone_number, address, city, country, password)
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `;
		const isDoup = await client.query(checkDoupQuery);
		if (isDoup.rows.length === 0) {
			await client.query(addUserQuery, userData);
			return "User created!";
		} else {
			return "Email already in use.";
		}
	} catch (err) {
		logger.error(err);
		return "could not create user";
	}
};

module.exports = { insertUser };
