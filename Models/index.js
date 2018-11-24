const Device = require("./src/objects/device")
const Action = require("./src/objects/action")
const Sensor = require("./src/objects/sensor")
const Message = require("./src/objects/message")
const Broker = require("./src/objects/broker")

const Actions = require("./src/enums/actions")
const Sensors = require("./src/enums/sensors")

const ActionDeviceRequestData = require("./src/data/request.action.device")
const ActionSensorRequestData = require("./src/data/request.action.sensor")
const RegisterRequestData = require("./src/data/request.register")
const ActionDeviceResponseData = require("./src/data/response.action.device")
const ActionSensorResponseData = require("./src/data/response.action.sensor")
const RegisterResponseData = require("./src/data/response.register")
const SensorData = require("./src/data/response.sensor")

const ActionDeviceRequest = require("./src/messages/request.action.device")
const ActionSensorRequest = require("./src/messages/request.action.sensor")
const RegisterRequest = require("./src/messages/request.register")
const ActionDeviceResponse = require("./src/messages/response.action.device")
const ActionSensorResponse = require("./src/messages/response.action.sensor")
const RegisterResponse = require("./src/messages/response.register")
const SensorDataResponse = require("./src/messages/response.sensor")

module.exports = {
    "objects": {
        "Device": Device,
        "Action": Action,
        "Sensor": Sensor,
        "Message": Message,
        "Broker": Broker
    },
    "enums": {
        "Actions": Actions,
        "Sensors": Sensors
    },
    "data": {
        "ActionDeviceRequestData": ActionDeviceRequestData,
        "ActionSensorRequestData": ActionSensorRequestData,
        "RegisterRequestData": RegisterRequestData,
        "ActionDeviceResponseData": ActionDeviceResponseData,
        "ActionSensorResponseData": ActionSensorResponseData,
        "RegisterResponseData": RegisterResponseData,
        "SensorData": SensorData,
    },
    "messages": {
        "ActionDeviceRequest": ActionDeviceRequest,
        "ActionSensorRequest": ActionSensorRequest,
        "RegisterRequest": RegisterRequest,
        "ActionDeviceResponse": ActionDeviceResponse,
        "ActionSensorResponse": ActionSensorResponse,
        "RegisterResponse": RegisterResponse,
        "SensorDataResponse": SensorDataResponse,
    }
}
