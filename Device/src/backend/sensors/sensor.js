const AbstractNotImplementedError = require("common").utils.errors.AbstractNotImplementedError

class Sensor {
    initialize(sensorData, protocol) {
        throw new AbstractNotImplementedError()
    }

    deinitialize() {
    }

    value() {
        return ""
    }
}

module.exports = Sensor