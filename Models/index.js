const Broker = require("./src/containers/broker")
const Profile = require("./src/containers/profile")

const Device = require("./src/protocol/entities/device")
const Action = require("./src/protocol/entities/action")
const Sensor = require("./src/protocol/entities/sensor")
const Message = require("./src/protocol/entities/message")

const Actions = require("./src/protocol/enums/actions")
const Sensors = require("./src/protocol/enums/sensors")

const ActionDeviceRequestData = require("./src/protocol/data/request.action.device")
const ActionSensorRequestData = require("./src/protocol/data/request.action.sensor")
const RegisterRequestData = require("./src/protocol/data/request.register")
const ActionDeviceResponseData = require("./src/protocol/data/response.action.device")
const ActionSensorResponseData = require("./src/protocol/data/response.action.sensor")
const RegisterResponseData = require("./src/protocol/data/response.register")
const SensorData = require("./src/protocol/data/response.sensor")

const ActionDeviceRequest = require("./src/protocol/messages/request.action.device")
const ActionSensorRequest = require("./src/protocol/messages/request.action.sensor")
const RegisterRequest = require("./src/protocol/messages/request.register")
const ActionDeviceResponse = require("./src/protocol/messages/response.action.device")
const ActionSensorResponse = require("./src/protocol/messages/response.action.sensor")
const RegisterResponse = require("./src/protocol/messages/response.register")
const SensorDataResponse = require("./src/protocol/messages/response.sensor")

module.exports = {
    "containers": {
        "Broker": Broker,
        "Profile": Profile
    },
    "protocol": {
        "entities": {
            "Device": Device,
            "Action": Action,
            "Sensor": Sensor,
            "Message": Message
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
            "SensorData": SensorData
        },
        "messages": {
            "ActionDeviceRequest": ActionDeviceRequest,
            "ActionSensorRequest": ActionSensorRequest,
            "RegisterRequest": RegisterRequest,
            "ActionDeviceResponse": ActionDeviceResponse,
            "ActionSensorResponse": ActionSensorResponse,
            "RegisterResponse": RegisterResponse,
            "SensorDataResponse": SensorDataResponse
        }
    }
}
