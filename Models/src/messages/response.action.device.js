const Response = require("./exchange").Response

class ActionDeviceResponse extends Response {
    static message() {
        return "RESP_DEVICE_ACTION"
    }

    constructor(actionDeviceResponseData) {
        super()
        this.actionDeviceResponseData = actionDeviceResponseData
    }

    properties() {
        return this.actionDeviceResponseData.properties()
    }
}

module.exports = ActionDeviceResponse
