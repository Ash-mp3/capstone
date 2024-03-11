const { models } = require('mongoose');
const winston = require('winston');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
    level: process.env.LOG.LEVEL || 'debug',
    format: combine(timestamp({
        // format: 'YYYY-MM-DD hh:mm::ss.SSS A',
        // hh (12 hr) HH (24 hr) A (AM/PM)
    }), json()),
    transports: [
        new winston.transport.File({
            filename: `${__dirname}/../logs/server.log`
        }),
        new winston.transport.Console()
    ],
})
module.exports = logger