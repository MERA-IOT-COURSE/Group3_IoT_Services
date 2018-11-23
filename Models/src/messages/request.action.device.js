const Request = require("./exchange").Request

class ActionDeviceRequest extends Request {
    static message() {
        return "REQ_DEVICE_ACTION"
    }

    constructor(actionDeviceRequestData) {
        super()
        this.actionDeviceRequestData = actionDeviceRequestData
    }

    properties() {
        return this.actionDeviceRequestData.properties()
    }
}

module.exports = ActionDeviceRequest
