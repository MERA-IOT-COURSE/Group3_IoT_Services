const AbstractNotImplementedError = require("../errors/implementation").AbstractNotImplementedError

class Messages {
    constructor() {
        this.collection = "messages"
    }

    initialize() {
        throw new AbstractNotImplementedError()
    }

    get(message) {
        throw new AbstractNotImplementedError()
    }

    save(message, data) {
        throw new AbstractNotImplementedError()
    }
}

module.exports = Messages