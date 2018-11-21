const Response = require("./base.instances").Response

class SensorData extends Response {
    constructor(sensorId, value, ts = null) {
        super()
        this.sensorId = sensorId
        this.value = value
        this.ts = ts
    }

    static message() {
        return "SENSOR_DATA"
    }

    dict() {
        var properties = {
            "sensor_id": this.sensorId,
            "value": this.value
        }
        if (this.ts != null) {
            properties["ts"] = this.ts
        }
        return properties
    }
}

module.exports.SensorData = SensorData