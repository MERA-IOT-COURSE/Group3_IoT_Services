const Response = require("./base.instances").Response

class ActionDeviceResponse extends Response {
    constructor(id, status, data = null) {
        super()
        this.id = id
        this.status = status
        this.data = data
    }

    static message() {
        return "RESP_DEVICE_ACTION"
    }

    dict() {
        var properties = {
            "id": this.id,
            "status": this.status
        }
        if (this.data != null) {
            properties["data"] = this.data
        }
        return properties
    }
}

class ActionSensorResponse extends Response {
    constructor(id, sensorId, status, data = null) {
        super()
        this.id = id
        this.sensorId = sensorId
        this.status = status
        this.data = data
    }

    static message() {
        return "RESP_SENSOR_ACTION"
    }

    dict() {
        var properties = {
            "id": this.id,
            "sensor_id": this.sensorId,
            "status": this.status
        }
        if (this.data != null) {
            properties["data"] = this.data
        }
        return properties
    }
}

module.exports = {
    "ActionDeviceResponse": ActionDeviceResponse,
    "ActionSensorResponse": ActionSensorResponse
}