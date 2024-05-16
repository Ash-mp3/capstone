const winston = require("winston");
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
	level: process.env.LOG_LEVEL || "debug",
	format: combine(
		timestamp({
			format: "YYYY-MM-DD hh:mm::ss.SSS A",
			// hh (12 hr) HH (24 hr) A (AM/PM)
		}),
		json()
	),
	transports: [
		new winston.transports.File({
			filename: `${__dirname}/../logs/server.log`,
		}),
		new winston.transports.Console(),
	],
});
module.exports = logger;
