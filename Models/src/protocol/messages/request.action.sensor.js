const Request = require("./exchange").Request

class ActionSensorRequest extends Request {
    static message() {
        return "REQ_SENSOR_ACTION"
    }

    constructor(actionSensorRequestData) {
        super()
        this.actionSensorRequestData = actionSensorRequestData
    }

    properties() {
        return this.actionSensorRequestData.properties()
    }
}

module.exports = ActionSensorRequest
