const Entity = require("../entity")

class Message extends Entity {
    static parse(data) {
        const RegisterRequest = require("../messages/request.register")
        const RegisterRequestData = require("../data/request.register")
        const RegisterResponse = require("../messages/response.register")
        const RegisterResponseData = require("../data/response.register")
        const SensorDataResponse = require("../messages/response.sensor")
        const SensorData = require("../data/response.sensor")
        const ActionDeviceRequest = require("../messages/request.action.device")
        const ActionDeviceRequestData = require("../data/request.action.device")
        const ActionSensorRequest = require("../messages/request.action.sensor")
        const ActionSensorRequestData = require("../data/request.action.sensor")
        const ActionDeviceResponse = require("../messages/response.action.device")
        const ActionDeviceResponseData = require("../data/response.action.device")
        const ActionSensorResponse = require("../messages/response.action.sensor")
        const ActionSensorResponseData = require("../data/response.action.sensor")

        var messageId = data["mid"]
        var data
        switch (messageId) {
            case RegisterRequest.message():
                data = RegisterRequestData.parse(data["data"])
                break
            case RegisterResponse.message():
                data = RegisterResponseData.parse(data["data"])
                break
            case SensorDataResponse.message():
                data = SensorData.parse(data["data"])
                break
            case ActionDeviceRequest.message():
                data = ActionDeviceRequestData.parse(data["data"])
                break
            case ActionSensorRequest.message():
                data = ActionSensorRequestData.parse(data["data"])
                break
            case ActionDeviceResponse.message():
                data = ActionDeviceResponseData.parse(data["data"])
                break
            case ActionSensorResponse.message():
                data = ActionSensorResponseData.parse(data["data"])
                break
            default:
                data = null
                break
        }
        return new Message(messageId, data)
    }

    constructor(messageId, data) {
        super()
        this.messageId = messageId
        this.data = data
    }

    properties() {
        return {
            "mid": this.messageId,
            "data": this.data.properties()
        }
    }
}

module.exports = Message
