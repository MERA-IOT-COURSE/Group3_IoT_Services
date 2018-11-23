const Response = require("./exchange").Response

class ActionSensorResponse extends Response {
    static message() {
        return "RESP_SENSOR_ACTION"
    }

    constructor(actionSensorResponseData) {
        super()
        this.actionSensorResponseData = actionSensorResponseData
    }

    properties() {
        return this.actionSensorResponseData.properties()
    }
}

module.exports = ActionSensorResponse
