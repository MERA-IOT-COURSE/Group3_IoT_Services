const Entity = require("../entity")

class SensorData extends Entity {
    static parse(data) {
        var sensorId = data["sensor_id"]
        var value = data["value"]
        var ts = data.hasOwnProperty("ts") ? data["ts"] : null
        return new SensorData(sensorId, value, ts)
    }

    constructor(sensorId, value, ts = null) {
        super()
        this.sensorId = sensorId
        this.value = value
        this.ts = ts
    }

    properties() {
        var result = {
            "sensor_id": this.sensorId,
            "value": this.value
        }
        if (this.ts != null) {
            result["ts"] = this.ts
        }
        return result
    }
}

module.exports = SensorData
