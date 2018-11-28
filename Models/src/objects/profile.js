const Broker = require("./broker")

class Profile {
    constructor(options = {}) {
        this.be_id = options["be_id"] || "server"
        this.broker = options["broker"] ||
            new Broker(
                {
                    host: "localhost",
                    port: 1883
                }
            )
        this.active = options["active"] || true
    }
}

module.exports = Profile
