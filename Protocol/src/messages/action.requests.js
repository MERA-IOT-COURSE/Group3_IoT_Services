const Request = require("./base.instances").Request

class ActionDeviceRequest extends Request {
    constructor(id) {
        super()
        this.id = id
    }

    static message() {
        return "REQ_DEVICE_ACTION"
    }

    dict() {
        return {
            "id": this.id
        }
    }
}

class ActionSensorRequest extends Request {
    constructor(id, sensorId) {
        super()
        this.id = id
        this.sensorId = sensorId
    }

    static message() {
        return "REQ_SENSOR_ACTION"
    }

    dict() {
        return {
            "id": this.id,
            "sensor_id": this.sensorId
        }
    }
}

module.exports = {
    "ActionDeviceRequest": ActionDeviceRequest,
    "ActionSensorRequest": ActionSensorRequest
}