const utils = require("utils")
const AbstractNotImplementedError = utils.errors.AbstractNotImplementedError
const StaticNotImplementedError = utils.errors.StaticNotImplementedError

const Message = require("../objects/message")

class ExchangeInstance {
    static message() {
        throw new StaticNotImplementedError(this.name)
    }

    properties() {
        throw new AbstractNotImplementedError()
    }

    create() {
        return JSON.stringify(new Message(this.constructor.message(), this).properties())
    }
}

class Request extends ExchangeInstance {
}

class Response extends ExchangeInstance {
}

module.exports = {
    "Request": Request,
    "Response": Response
}
