const Response = require("./exchange").Response

class RegisterResponse extends Response {
    static message() {
        return "REGISTER_RESP"
    }

    constructor(registerResponseData) {
        super()
        this.registerResponseData = registerResponseData
    }

    properties() {
        return this.registerResponseData.properties()
    }
}

module.exports = RegisterResponse
