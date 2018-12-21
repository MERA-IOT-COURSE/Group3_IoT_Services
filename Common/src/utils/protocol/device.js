const host = require("./host")
const AbstractHost = host.AbstractHost
const version = host.version

const RegisterRequest = require("../../models/protocol/messages/request.register")
const RegisterResponse = require("../../models/protocol/messages/response.register")
const SensorDataResponse = require("../../models/protocol/messages/response.sensor")
const ActionDeviceRequest = require("../../models/protocol/messages/request.action.device")
const ActionSensorRequest = require("../../models/protocol/messages/request.action.sensor")
const ActionDeviceResponse = require("../../models/protocol/messages/response.action.device")
const ActionSensorResponse = require("../../models/protocol/messages/response.action.sensor")
const RegisterRequestData = require("../../models/protocol/data/request.register")
const AbstractNotImplementedError = require("../errors/implementation").AbstractNotImplementedError

class AbstractDevice extends AbstractHost {
    prepare() {
        this.client.on("message", (topic, messageData, packet) => { this.getMessage(topic, messageData) })
        this.subscribe(`dev_${this.profile.device.id}`)
        var registerRequestData = new RegisterRequestData(version, this.profile.device)
        this.sendMessage(RegisterRequest, `init_${this.profile.backendId}`, registerRequestData)
    }

    topicsListener(topic, message) {
        if (topic === `dev_${this.profile.device.id}`) {
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
                    this.sendMessage(ActionDeviceResponse, `be_${this.profile.device.id}`, actionDeviceResponseData)
                    break
                case ActionSensorRequest.message():
                    var actionSensorResponseData = this.handleMessageWithResult(ActionSensorRequest, topic, message.data, () => {
                        return this.handleActionSensorRequest(message.data)
                    })
                    this.sendMessage(ActionSensorResponse, `be_${this.profile.device.id}`, actionSensorResponseData)
                    break
                default:
                    break
            }
        }
    }

    handleRegisterResponse(registerResponseData) {
        throw new AbstractNotImplementedError()
    }

    handleActionDeviceRequest(actionDeviceRequestData) { // -> ActionDeviceResponseData
        throw new AbstractNotImplementedError()
    }

    handleActionSensorRequest(actionSensorRequestData) { // -> ActionSensorResponseData
        throw new AbstractNotImplementedError()
    }

    sendSensorDataResponse(sensorData) {
        this.sendMessage(SensorDataResponse, `be_${this.profile.device.id}`, sensorData)
    }
}

module.exports = AbstractDevice
