const MQTT = require("mqtt")
const RegisterRequest = require("../messages/register.request").RegisterRequest
const RegisterResponse = require("../messages/register.response").RegisterResponse
const SensorData = require("../messages/sensor.data").SensorData
const ActionDeviceRequest = require("../messages/action.requests").ActionDeviceRequest
const ActionSensorRequest = require("../messages/action.requests").ActionSensorRequest
const ActionDeviceResponse = require("../messages/action.responses").ActionDeviceResponse
const ActionSensorResponse = require("../messages/action.responses").ActionSensorResponse

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
        this.client.on("message", (topic, message, packet) => { this.topicsListener(topic, message) })
        this.client.subscribe(`init_${this.backendId}`)
    }

    topicsListener(topic, message) {
        var data = JSON.parse(message.toString())
        if (topic === `init_${this.backendId}`) {
            switch (data["mid"]) {
                case RegisterRequest.message():
                    var registerResponse = this.getRegisterResponse(data["data"])
                    if (registerResponse === "OK") {
                        this.client.subscribe(`be_${data["data"]["hw_id"]}`)
                    }
                    this.client.publish(`dev_${data["data"]["hw_id"]}`, new RegisterResponse(registerResponse).create())
                    break
                default:
                    break
            }
        } else if (topic.startsWith("be_")) {
            switch (data["mid"]) {
                case SensorData.message():
                    this.handleSensorDataResponse(topic.substring(3), data["data"])
                    break
                case ActionDeviceResponse.message():
                    this.handleDeviceActionResponse(data["data"])
                    break
                case ActionSensorResponse.message():
                    this.handleSensorActionResponse(data["data"])
                    break
                default:
                    break
            }
        }
    }

    getRegisterResponse(data) {
        return data["version"] === version ? this.initializeDevice(data) : "Unsupported version of protocol"
    }

    initializeDevice(data) { // -> String
        throw new Error("AbstarctServer: the implementation of \"initializeDevice\" method is required")
    }

    handleSensorDataResponse(deviceId, data) {
        throw new Error("AbstarctServer: the implementation of \"handleSensorData\" method is required")
    }

    handleDeviceActionResponse(data) {
        throw new Error("AbstarctServer: the implementation of \"handleDeviceAction\" method is required")
    }

    handleSensorActionResponse(data) {
        throw new Error("AbstarctServer: the implementation of \"handleSensorAction\" method is required")
    }

    callDeviceAction(deviceId, deviceActionId) {
        this.client.publish(`dev_${deviceId}`, new ActionDeviceRequest(deviceActionId).create())
    }

    callSensorAction(deviceId, sensorActionId, sensorId) {
        this.client.publish(`dev_${deviceId}`, new ActionSensorRequest(sensorActionId, sensorId).create())
    }
}

class AbstractDevice extends AbstractHost {
    constructor(broker, backendId, device) {
        super(broker)
        this.backendId = backendId
        this.device = device
    }

    prepare() {
        this.client.on("message", (topic, message, packet) => { this.topicsListener(topic, message) })
        this.client.subscribe(`dev_${this.device.id}`)
        this.client.publish(`init_${this.backendId}`, new RegisterRequest(version, this.device).create())
    }

    topicsListener(topic, message) {
        var data = JSON.parse(message.toString())
        if (topic.startsWith("dev_")) {
            switch (data["mid"]) {
                case RegisterResponse.message():
                    if (data["data"]["status"] != "OK") {
                        this.end()
                        throw new Error(`The registration procedure is failed: ${data["data"]["status"]}`)
                    }
                    break
                case ActionDeviceRequest.message():
                    var actionDeviceResponse = this.handleDeviceActionRequest(data["data"]["id"])
                    this.client.publish(`be_${this.device.id}`, new ActionDeviceResponse(data["data"]["id"],
                        actionDeviceResponse["status"], actionDeviceResponse["data"]).create())
                    break
                case ActionSensorRequest.message():
                    var actionSensorResponse = this.handleSensorActionRequest(data["data"]["id"], data["data"]["sensor_id"])
                    this.client.publish(`be_${this.device.id}`, new ActionSensorResponse(data["data"]["id"],
                        data["data"]["sensor_id"], actionSensorResponse["status"], actionSensorResponse["data"]).create())
                    break
                default:
                    break
            }
        }
    }

    handleDeviceActionRequest(deviceActionId) { // -> { status: String, data: String? }
        throw new Error("AbstarctDevice: the implementation of \"handleDeviceActionRequest\" method is required")
    }

    handleSensorActionRequest(sensorActionId, sensorId) { // -> { status: String, data: String? }
        throw new Error("AbstarctDevice: the implementation of \"handleSensorActionRequest\" method is required")
    }

    sendSensorDataResponse(sensorId, value, ts = null) {
        this.client.publish(`be_${this.device.id}`, new SensorData(sensorId, value, ts).create())
    }
}

module.exports = {
    "AbstractServer": AbstractServer,
    "AbstractDevice": AbstractDevice
}