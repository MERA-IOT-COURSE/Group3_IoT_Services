const Broker = require("./broker")

class Profile {
    constructor(options = {}) {
        this.backendId = options["backendId"] || "group3-be"
        this.broker = options["broker"] || new Broker()
        this.active = options["active"] || true
    }
}

module.exports = Profile
