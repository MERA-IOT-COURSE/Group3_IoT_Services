const notImplementedErrors = require("./src/error.implementation")

module.exports = {
    "errors": {
        "AbstractNotImplementedError": notImplementedErrors.AbstractNotImplementedError,
        "StaticNotImplementedError": notImplementedErrors.StaticNotImplementedError
    }
}
