const Entity = require("../entity")

class RegisterResponseData extends Entity {
    static parse(data) {
        var status = data["status"]
        var delay = data.hasOwnProperty("registration_delay") ? data["registration_delay"] : 0
        return new RegisterResponseData(status, delay)
    }

    constructor(status, delay = 0) {
        super()
        this.status = status
        this.delay = delay
    }

    properties() {
        var result = {
            "status": this.status
        }
        if (this.delay > 0) {
            result["registration_delay"] = this.delay
        }
        return result
    }
}

module.exports = RegisterResponseData
