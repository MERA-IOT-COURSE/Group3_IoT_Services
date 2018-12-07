const Response = require("./exchange").Response

class SensorDataResponse extends Response {
    static message() {
        return "SENSOR_DATA"
    }

    constructor(sensorData) {
        super()
        this.sensorData = sensorData
    }

    properties() {
        return this.sensorData.properties()
    }
}

module.exports = SensorDataResponse
