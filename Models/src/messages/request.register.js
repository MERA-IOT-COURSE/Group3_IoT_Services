const Request = require("./exchange").Request

class RegisterRequest extends Request {
    static message() {
        return "REGISTER"
    }

    constructor(registerRequestData) {
        super()
        this.registerRequestData = registerRequestData
    }

    properties() {
        return this.registerRequestData.properties()
    }
}

module.exports = RegisterRequest
