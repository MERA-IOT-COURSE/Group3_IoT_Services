const AbstractHost = require("./host").AbstractHost
const version = require("./host").version

const models = require("models")

const RegisterRequest = models.messages.RegisterRequest
const RegisterResponse = models.messages.RegisterResponse
const SensorDataResponse = models.messages.SensorDataResponse
const ActionDeviceRequest = models.messages.ActionDeviceRequest
const ActionSensorRequest = models.messages.ActionSensorRequest
const ActionDeviceResponse = models.messages.ActionDeviceResponse
const ActionSensorResponse = models.messages.ActionSensorResponse

const RegisterResponseData = models.data.RegisterResponseData

const utils = require("utils")
const AbstractNotImplementedError = utils.errors.AbstractNotImplementedError

class AbstractServer extends AbstractHost {
    constructor(broker, backendId) {
        super("SERVER", broker)
        this.backendId = backendId
    }

    prepare() {
        this.client.on("message", (topic, messageData, packet) => { this.getMessage(topic, messageData) })
        this.subscribe(`init_${this.backendId}`)
    }

    topicsListener(topic, message) {
        if (topic === `init_${this.backendId}`) {
            switch (message.messageId) {
                case RegisterRequest.message():
                    var registerResponseData = this.handleMessageWithResult(RegisterRequest, `init_${this.backendId}`, message.data, () => {
                        return this.getRegisterResponse(message.data.device.id, message.data)
                    })
                    if (registerResponseData.status === "OK") {
                        this.subscribe(`be_${message.data.device.id}`)
                    }
                    this.sendMessage(RegisterResponse, `dev_${message.data.device.id}`, registerResponseData)
                    break
                default:
                    break
            }
        } else if (topic.startsWith("be_")) {
            var deviceId = topic.substring(3)
            switch (message.messageId) {
                case SensorDataResponse.message():
                    this.handleMessage(SensorDataResponse, topic, message.data, () => { this.handleSensorDataResponse(deviceId, message.data) })
                    break
                case ActionDeviceResponse.message():
                    this.handleMessage(ActionDeviceResponse, topic, message.data, () => { this.handleActionDeviceResponse(deviceId, message.data) })
                    break
                case ActionSensorResponse.message():
                    this.handleMessage(ActionSensorResponse, topic, message.data, () => { this.handleActionSensorResponse(deviceId, message.data) })
                    break
                default:
                    break
            }
        }
    }

    getRegisterResponse(deviceId, registerRequestData) { // -> RegisterResponseData
        return registerRequestData.version === version ?
            this.handleRegisterRequest(deviceId, registerRequestData) :
            new RegisterResponseData("Unsupported version of protocol")
    }

    handleRegisterRequest(deviceId, registerRequestData) { // -> RegisterResponseData
        throw AbstractServer.closeClientAndCreateError(this.client, new AbstractNotImplementedError())
    }

    handleSensorDataResponse(deviceId, sensorDataResponseData) {
        throw AbstractServer.closeClientAndCreateError(this.client, new AbstractNotImplementedError())
    }

    handleActionDeviceResponse(deviceId, deviceActionResponseData) {
        throw AbstractServer.closeClientAndCreateError(this.client, new AbstractNotImplementedError())
    }

    handleActionSensorResponse(deviceId, sensorActionResponseData) {
        throw AbstractServer.closeClientAndCreateError(this.client, new AbstractNotImplementedError())
    }

    sendActionDeviceRequest(deviceId, actionDeviceRequestData) {
        this.sendMessage(ActionDeviceRequest, `dev_${deviceId}`, actionDeviceRequestData)
    }

    sendActionSensorRequest(deviceId, actionSensorRequestData) {
        this.sendMessage(ActionSensorRequest, `dev_${deviceId}`, actionSensorRequestData)
    }
}

module.exports = AbstractServer
