const notImplementedErrors = require("../../../utils/errors/implementation")
const AbstractNotImplementedError = notImplementedErrors.AbstractNotImplementedError
const StaticNotImplementedError = notImplementedErrors.StaticNotImplementedError

const Message = require("../entities/message")

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
