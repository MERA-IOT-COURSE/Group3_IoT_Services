const Response = require("./base.instances").Response

class RegisterResponse extends Response {
    constructor(status) {
        super()
        this.status = status
    }

    static message() {
        return "REGISTER_RESP"
    }

    dict() {
        return {
            "status": this.status
        }
    }
}

module.exports.RegisterResponse = RegisterResponse