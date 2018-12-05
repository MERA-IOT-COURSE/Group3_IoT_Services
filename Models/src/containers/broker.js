class Broker {
    constructor(options = {}) {
        this.host = options["host"] || "localhost"
        this.port = options["port"] || 1883
    }
}

module.exports = Broker
