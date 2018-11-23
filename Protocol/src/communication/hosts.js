const MQTT = require("mqtt")
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
const RegisterResponseData = models.data.RegisterResponseData

const version = "1.0"

class AbstractHost {
    constructor(broker) {
        this.broker = broker
        this.client = null
    }

    init() {
        this.client = MQTT.connect(`mqtt://${this.broker.host}:${this.broker.port}`)
        this.client.on("connect", () => { this.prepare() })
    }

    prepare() {
        throw new Error("AbstractHost: the implementation of \"prepare\" method is required")
    }

    topicsListener(topic, message) {
        throw new Error("AbstractHost: the implementation of \"topicsListener\" method is required")
    }

    end() {
        this.client.end()
    }
}

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
        throw new Error("AbstarctDevice: the implementation of \"handleRegisterResponse\" method is required")
    }

    handleActionDeviceRequest(actionDeviceRequestData) { // -> ActionDeviceResponseData
        throw new Error("AbstarctDevice: the implementation of \"handleActionDeviceRequest\" method is required")
    }

    handleActionSensorRequest(actionSensorRequestData) { // -> ActionSensorResponseData
        throw new Error("AbstarctDevice: the implementation of \"handleActionSensorRequest\" method is required")
    }

    sendSensorDataResponse(sensorData) {
        this.client.publish(`be_${this.device.id}`, new SensorDataResponse(sensorData).create())
    }
}

module.exports = {
    "AbstractServer": AbstractServer,
    "AbstractDevice": AbstractDevice
}
