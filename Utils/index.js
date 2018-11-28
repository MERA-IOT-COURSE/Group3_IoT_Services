const ConfigurationProfile = require("./src/config.profile")
const notImplementedErrors = require("./src/error.implementation")
const logs = require("./src/logger")

module.exports = {
    "ConfigurationProfile": ConfigurationProfile,
    "errors": {
        "AbstractNotImplementedError": notImplementedErrors.AbstractNotImplementedError,
        "StaticNotImplementedError": notImplementedErrors.StaticNotImplementedError
    },
    "logs": logs
}
