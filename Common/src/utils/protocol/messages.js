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

    saveIncoming(topic, message, data, datetime = new Date()) {
        this.save(topic, message, data, "INCOMING", datetime)
    }

    saveOutcoming(topic, message, data, datetime = new Date()) {
        this.save(topic, message, data, "OUTCOMING", datetime)
    }

    save(topic, message, data, comment, datetime = new Date()) {
        throw new AbstractNotImplementedError()
    }
}

module.exports = Messages