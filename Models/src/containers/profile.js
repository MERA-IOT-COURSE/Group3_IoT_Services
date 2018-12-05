const Broker = require("./broker")

class Profile {
    constructor(options = {}) {
        this.be_id = options["be_id"] || "server"
        this.broker = options["broker"] || new Broker()
        this.active = options["active"] || true
    }
}

module.exports = Profile
