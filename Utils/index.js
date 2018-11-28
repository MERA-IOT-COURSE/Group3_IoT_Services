const notImplementedErrors = require("./src/error.implementation")
const logs = require("./src/logger")

module.exports = {
    "errors": {
        "AbstractNotImplementedError": notImplementedErrors.AbstractNotImplementedError,
        "StaticNotImplementedError": notImplementedErrors.StaticNotImplementedError
    },
    "logs": logs
}
