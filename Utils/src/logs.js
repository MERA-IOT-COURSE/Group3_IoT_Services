const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('logs.json')
const db = low(adapter)

function format(time) {
    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return time.toLocaleString("en-US", options)
}

function add(unit, scope, message, time) {
    console.log(`${unit}: [${time}] ${scope} | ${message}`)
    db.get("logs").push({
        "unit": unit,
        "scope": scope,
        "message": message,
        "time": time
    }).write()
}

class Logs {
    constructor() {
        db.defaults({ "logs": [] }).write()
    }

    info(unit, message, time = new Date()) {
        add(unit, "INFO ", message, format(time))
    }

    debug(unit, message, time = new Date()) {
        add(unit, "DEBUG", message, format(time))
    }

    trace(unit, message, time = new Date()) {
        add(unit, "TRACE", message, format(time))
    }

    error(unit, message, time = new Date()) {
        add(unit, "ERROR", message, format(time))
    }

    fatal(unit, message, time = new Date()) {
        add(unit, "FATAL", message, format(time))
    }

    all(unit) {
        return db.get("logs").map(unit).value()
    }
}

module.exports = new Logs()
