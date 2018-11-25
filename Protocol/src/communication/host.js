const MQTT = require("mqtt")

const utils = require("utils")
const AbstractNotImplementedError = utils.errors.AbstractNotImplementedError

class AbstractHost {
    static closeClientAndCreateError(client, error) {
        if (client != null && client.connected) {
            client.end()
        }
        return error
    }

    constructor(broker) {
        this.broker = broker
        this.client = null
    }

    init() {
        this.client = MQTT.connect(`mqtt://${this.broker.host}:${this.broker.port}`)
        this.client.on("connect", () => { this.prepare() })
    }

    prepare() {
        throw AbstractHost.closeClientAndCreateError(this.client, new AbstractNotImplementedError())
    }

    topicsListener(topic, message) {
        throw AbstractHost.closeClientAndCreateError(this.client, new AbstractNotImplementedError())
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
