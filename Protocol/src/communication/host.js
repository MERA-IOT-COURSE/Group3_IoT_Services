const MQTT = require("mqtt")

class AbstractHost {
    constructor(broker) {
        this.broker = broker
        this.client = null
    }

    init() {
        this.client = MQTT.connect(`mqtt://${this.broker.host}:${this.broker.port}`)
        this.client.on("connect", () => { this.prepare() })
    }

    prepare() {
        throw new Error("AbstractHost: the implementation of \"prepare\" method is required")
    }

    topicsListener(topic, message) {
        throw new Error("AbstractHost: the implementation of \"topicsListener\" method is required")
    }

    end() {
        this.client.end()
    }
}

const version = "1.0"

module.exports = {
    "AbstractHost": AbstractHost,
    "version": version
}
