const AbstractNotImplementedError = require("common").utils.errors.AbstractNotImplementedError

class Sensor {
    constructor(sensorData, protocol) {
        this.sensorData = sensorData
        this.protocol = protocol
    }

    initialize() {
        throw new AbstractNotImplementedError()
    }

    deinitialize() {
    }

    value() {
        return ""
    }
}

module.exports = Sensor