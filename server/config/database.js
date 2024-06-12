const pg = require("pg");
const logger = require("./logger");

const client = new pg.Client({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
	ssl: false,
});

client.connect((err) => {
	if (err) {
		logger.error("connection error", err.stack);
	} else {
		logger.info("connected to database");
	}
});

module.exports = client;
