const host = require("./host")
const AbstractHost = host.AbstractHost
const version = host.version

const models = require("models")
const RegisterRequest = models.protocol.messages.RegisterRequest
const RegisterResponse = models.protocol.messages.RegisterResponse
const SensorDataResponse = models.protocol.messages.SensorDataResponse
const ActionDeviceRequest = models.protocol.messages.ActionDeviceRequest
const ActionSensorRequest = models.protocol.messages.ActionSensorRequest
const ActionDeviceResponse = models.protocol.messages.ActionDeviceResponse
const ActionSensorResponse = models.protocol.messages.ActionSensorResponse
const RegisterResponseData = models.protocol.data.RegisterResponseData

const AbstractNotImplementedError = require("utils").errors.AbstractNotImplementedError

class AbstractServer extends AbstractHost {
    constructor(broker, backendId) {
        super(broker)
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
        throw new AbstractNotImplementedError()
    }

    handleSensorDataResponse(deviceId, sensorDataResponseData) {
        throw new AbstractNotImplementedError()
    }

    handleActionDeviceResponse(deviceId, deviceActionResponseData) {
        throw new AbstractNotImplementedError()
    }

    handleActionSensorResponse(deviceId, sensorActionResponseData) {
        throw new AbstractNotImplementedError()
    }

    sendActionDeviceRequest(deviceId, actionDeviceRequestData) {
        this.sendMessage(ActionDeviceRequest, `dev_${deviceId}`, actionDeviceRequestData)
    }

    sendActionSensorRequest(deviceId, actionSensorRequestData) {
        this.sendMessage(ActionSensorRequest, `dev_${deviceId}`, actionSensorRequestData)
    }
}

module.exports = AbstractServer
