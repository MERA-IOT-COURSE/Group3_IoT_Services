const notImplementedErrors = require("../../utils/errors/implementation")
const AbstractNotImplementedError = notImplementedErrors.AbstractNotImplementedError
const StaticNotImplementedError = notImplementedErrors.StaticNotImplementedError

class Entity {
    static parse(data) {
        throw new StaticNotImplementedError(this.name)
    }

    properties() {
        throw new AbstractNotImplementedError()
    }
}

module.exports = Entity
