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
        this.client.on("message", (topic, messageData, packet) => {
            var data = JSON.parse(messageData.toString())
            var message = Message.parse(data)
            this.topicsListener(topic, message)
        })
        this.client.subscribe(`dev_${this.device.id}`)
        var registerRequestData = new RegisterRequestData(version, this.device)
        this.client.publish(`init_${this.backendId}`, new RegisterRequest(registerRequestData).create())
    }

    topicsListener(topic, message) {
        if (topic === `dev_${this.device.id}`) {
            switch (message.messageId) {
                case RegisterResponse.message():
                    if (message.data.status !== "OK") {
                        throw new Error(`The registration procedure is failed: ${message.data.status}`)
                    }
                    this.handleRegisterResponse(message.data)
                    break
                case ActionDeviceRequest.message():
                    var actionDeviceResponseData = this.handleActionDeviceRequest(message.data)
                    this.client.publish(`be_${this.device.id}`, new ActionDeviceResponse(actionDeviceResponseData).create())
                    break
                case ActionSensorRequest.message():
                    var actionSensorResponseData = this.handleActionSensorRequest(message.data)
                    this.client.publish(`be_${this.device.id}`, new ActionSensorResponse(actionSensorResponseData).create())
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
        this.client.publish(`be_${this.device.id}`, new SensorDataResponse(sensorData).create())
    }
}

module.exports = AbstractDevice
