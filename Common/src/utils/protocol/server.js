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
const RegisterResponseData = require("../../models/protocol/data/response.register")
const AbstractNotImplementedError = require("../errors/implementation").AbstractNotImplementedError

class AbstractServer extends AbstractHost {
    prepare() {
        this.client.on("message", (topic, messageData, packet) => { this.getMessage(topic, messageData) })
        this.subscribe(`init_${this.profile.backendId}`)
    }

    topicsListener(topic, message) {
        if (topic === `init_${this.profile.backendId}`) {
            switch (message.messageId) {
                case RegisterRequest.message():
                    var registerResponseData = this.handleMessageWithResult(RegisterRequest, `init_${this.profile.backendId}`, message.data, () => {
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
