const AbstractHost = require("./host").AbstractHost
const version = require("./host").version

const models = require("models")

const Message = models.objects.Message

const RegisterRequest = models.messages.RegisterRequest
const RegisterResponse = models.messages.RegisterResponse
const SensorDataResponse = models.messages.SensorDataResponse
const ActionDeviceRequest = models.messages.ActionDeviceRequest
const ActionSensorRequest = models.messages.ActionSensorRequest
const ActionDeviceResponse = models.messages.ActionDeviceResponse
const ActionSensorResponse = models.messages.ActionSensorResponse

const RegisterResponseData = models.data.RegisterResponseData

class AbstractServer extends AbstractHost {
    constructor(broker, backendId) {
        super(broker)
        this.backendId = backendId
    }

    prepare() {
        this.client.on("message", (topic, messageData, packet) => {
            var data = JSON.parse(messageData.toString())
            var message = Message.parse(data)
            this.topicsListener(topic, message)
        })
        this.client.subscribe(`init_${this.backendId}`)
    }

    topicsListener(topic, message) {
        if (topic === `init_${this.backendId}`) {
            switch (message.messageId) {
                case RegisterRequest.message():
                    var registerResponseData = this.getRegisterResponse(message.data)
                    if (registerResponseData.status === "OK") {
                        this.client.subscribe(`be_${message.data.device.id}`)
                    }
                    this.client.publish(`dev_${message.data.device.id}`, new RegisterResponse(registerResponseData).create())
                    break
                default:
                    break
            }
        } else if (topic.startsWith("be_")) {
            var deviceId = topic.substring(3)
            switch (message.messageId) {
                case SensorDataResponse.message():
                    this.handleSensorDataResponse(deviceId, message.data)
                    break
                case ActionDeviceResponse.message():
                    this.handleActionDeviceResponse(deviceId, message.data)
                    break
                case ActionSensorResponse.message():
                    this.handleActionSensorResponse(deviceId, message.data)
                    break
                default:
                    break
            }
        }
    }

    getRegisterResponse(registerRequestData) { // -> RegisterResponseData
        return registerRequestData.version === version ?
            this.handleRegisterRequest(registerRequestData) :
            new RegisterResponseData("Unsupported version of protocol")
    }

    handleRegisterRequest(registerRequestData) { // -> RegisterResponseData
        throw new Error("AbstarctServer: the implementation of \"handleRegisterRequest\" method is required")
    }

    handleSensorDataResponse(deviceId, sensorDataResponseData) {
        throw new Error("AbstarctServer: the implementation of \"handleSensorDataResponse\" method is required")
    }

    handleActionDeviceResponse(deviceId, deviceActionResponseData) {
        throw new Error("AbstarctServer: the implementation of \"handleActionDeviceResponse\" method is required")
    }

    handleActionSensorResponse(deviceId, sensorActionResponseData) {
        throw new Error("AbstarctServer: the implementation of \"handleActionSensorResponse\" method is required")
    }

    sendActionDeviceRequest(deviceId, actionDeviceRequestData) {
        this.client.publish(`dev_${deviceId}`, new ActionDeviceRequest(actionDeviceRequestData).create())
    }

    sendActionSensorRequest(deviceId, actionSensorRequestData) {
        this.client.publish(`dev_${deviceId}`, new ActionSensorRequest(actionSensorRequestData).create())
    }
}

module.exports = AbstractServer
