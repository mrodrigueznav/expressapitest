const { createLogger, format, transports } = require('winston');
const path = require('path');

const customformat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.colorize(),
        customformat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: path.join(__dirname, '..', 'logs', 'app.log') }),
        new transports.File({ filename: path.join(__dirname, '..', 'logs', 'error.log'), level: 'error' })
    ],
});

module.exports = logger;