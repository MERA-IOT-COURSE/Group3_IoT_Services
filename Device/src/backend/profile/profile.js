const Broker = require('models').objects.Broker

class Profile {
    constructor(options = {}) {
        this.device = options["device"]
        this.be_id = options["be_id"] || "server"
        this.broker = options["broker"] ||
            new Broker(
                {
                    host: "localhost",
                    port: 1883
                }
            )
    }
}

module.exports = Profile