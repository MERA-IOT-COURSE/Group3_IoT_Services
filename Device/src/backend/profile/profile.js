class Broker {
    constructor(options = {}) {
        this.host = options["host"] || "localhost"
        this.port = options["port"] || 1883
    }
}

class DeviceProfile {
    constructor(options = {}) {
        this.backendId = options["backendId"] || "group3-be"
        this.broker = new Broker(options["broker"] || {})
        this.active = options["active"] === "true" || options["active"] === true
        this.device = options["device"]
    }
}

module.exports = DeviceProfile
