const { createLogger, format, transports } = require("winston")
const logsDirectory = require("./storage.output").logs
require("winston-daily-rotate-file")

function toLeft(level) {
    const leftPadding = "       "
    return (level + leftPadding).substring(0, leftPadding.length)
}

const logger = createLogger({
    level: "silly",
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss.SSS"
        }),
        format.printf(log => `[ ${log.timestamp} | ${toLeft(log.level.toUpperCase())} ] ${log.message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
            filename: `${logsDirectory}/%DATE%-results.log`,
            datePattern: "YYYY-MM-DD"
        })
    ],
    exitOnError: false
})

logger.stream = {
    write: function (message, encoding) {
        logger.info(message.slice(0, -1))
    },
}

class Logger {
    error(message) {
        logger.error(message)
    }

    warn(message) {
        logger.warn(message)
    }

    info(message) {
        logger.info(message)
    }

    verbose(message) {
        logger.verbose(message)
    }

    debug(message) {
        logger.debug(message)
    }
}

module.exports = {
    "logger": new Logger(),
    "stream": logger.stream
}
