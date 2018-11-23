const Message = require("../objects/message")

class ExchangeInstance {
    static message() {
        throw new Error("Instance: the implementation of \"message\" static method is required")
    }

    properties() {
        throw new Error("Instance: the implementation of \"properties\" method is required")
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
