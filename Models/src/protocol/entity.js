const utils = require("utils")
const AbstractNotImplementedError = utils.errors.AbstractNotImplementedError
const StaticNotImplementedError = utils.errors.StaticNotImplementedError

class Entity {
    static parse(data) {
        throw new StaticNotImplementedError(this.name)
    }

    properties() {
        throw new AbstractNotImplementedError()
    }
}

module.exports = Entity
