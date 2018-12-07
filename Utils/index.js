const lowdb = require("./src/database/lowdb")

const notImplementedErrors = require("./src/errors/implementation")

const logs = require("./src/logging/logger")

const ConfigurationProfile = require("./src/profile/config")

const AbstractRequests = require("./src/web/requests")
const launcher = require("./src/web/launcher")

module.exports = {
    "database": {
        "lowdb": lowdb
    },
    "errors": {
        "AbstractNotImplementedError": notImplementedErrors.AbstractNotImplementedError,
        "StaticNotImplementedError": notImplementedErrors.StaticNotImplementedError
    },
    "logging": {
        "logger": logs.logger,
        "stream": logs.stream
    },
    "profile": {
        "ConfigurationProfile": ConfigurationProfile
    },
    "web": {
        "AbstractRequests": AbstractRequests,
        "launcher": launcher
    }
}
