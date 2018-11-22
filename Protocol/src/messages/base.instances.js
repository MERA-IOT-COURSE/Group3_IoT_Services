var Message = require("./message").Message

class Instance {
    static message() {
        throw new Error("Instance: the implementation of \"message\" method is required")
    }

    dict() {
        throw new Error("Instance: the implementation of \"dict\" method is required")
    }

    create() {
        return JSON.stringify(new Message(this.constructor.message(), this.dict()).dict())
    }
}

class Request extends Instance {
}

class Response extends Instance {
}

module.exports = {
    "Request": Request,
    "Response": Response
}