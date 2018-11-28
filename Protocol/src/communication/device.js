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

const RegisterRequestData = models.data.RegisterRequestData

const utils = require("utils")
const AbstractNotImplementedError = utils.errors.AbstractNotImplementedError

class AbstractDevice extends AbstractHost {
    constructor(broker, backendId, device) {
        super(broker)
        this.backendId = backendId
        this.device = device
    }

    prepare() {
        this.client.on("message", (topic, messageData, packet) => { this.getMessage(topic, messageData) })
        this.subscribe(`dev_${this.device.id}`)
        var registerRequestData = new RegisterRequestData(version, this.device)
        this.sendMessage(RegisterRequest, `init_${this.backendId}`, registerRequestData)
    }

    topicsListener(topic, message) {
        if (topic === `dev_${this.device.id}`) {
            switch (message.messageId) {
                case RegisterResponse.message():
                    if (message.data.status !== "OK") {
                        throw new Error(`The registration procedure is failed: ${message.data.status}`)
                    }
                    this.handleMessage(RegisterResponse, topic, message.data, () => { this.handleRegisterResponse(message.data) })
                    break
                case ActionDeviceRequest.message():
                    var actionDeviceResponseData = this.handleMessageWithResult(ActionDeviceRequest, topic, message.data, () => {
                        return this.handleActionDeviceRequest(message.data)
                    })
                    this.sendMessage(ActionDeviceResponse, `be_${this.device.id}`, actionDeviceResponseData)
                    break
                case ActionSensorRequest.message():
                    var actionSensorResponseData = this.handleMessageWithResult(ActionSensorRequest, topic, message.data, () => {
                        return this.handleActionSensorRequest(message.data)
                    })
                    this.sendMessage(ActionSensorResponse, `be_${this.device.id}`, actionSensorResponseData)
                    break
                default:
                    break
            }
        }
    }

    handleRegisterResponse(registerResponseData) {
        throw AbstractDevice.closeClientAndCreateError(this.client, new AbstractNotImplementedError())
    }

    handleActionDeviceRequest(actionDeviceRequestData) { // -> ActionDeviceResponseData
        throw AbstractDevice.closeClientAndCreateError(this.client, new AbstractNotImplementedError())
    }

    handleActionSensorRequest(actionSensorRequestData) { // -> ActionSensorResponseData
        throw AbstractDevice.closeClientAndCreateError(this.client, new AbstractNotImplementedError())
    }

    sendSensorDataResponse(sensorData) {
        this.sendMessage(SensorDataResponse, `be_${this.device.id}`, sensorData)
    }
}

module.exports = AbstractDevice
