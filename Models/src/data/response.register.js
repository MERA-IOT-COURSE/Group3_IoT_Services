const Entity = require("../entity")

class RegisterResponseData extends Entity {
    static parse(data) {
        var status = data["status"]
        return new RegisterResponseData(status)
    }

    constructor(status) {
        super()
        this.status = status
    }

    properties() {
        return {
            "status": this.status
        }
    }
}

module.exports = RegisterResponseData
