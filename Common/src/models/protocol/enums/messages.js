const ActionDeviceRequest = require("../messages/request.action.device")
const ActionSensorRequest = require("../messages/request.action.sensor")
const RegisterRequest = require("../messages/request.register")
const ActionDeviceResponse = require("../messages/response.action.device")
const ActionSensorResponse = require("../messages/response.action.sensor")
const RegisterResponse = require("../messages/response.register")
const SensorDataResponse = require("../messages/response.sensor")

module.exports = {
    "ActionDeviceRequest": ActionDeviceRequest.message(),
    "ActionSensorRequest": ActionSensorRequest.message(),
    "RegisterRequest": RegisterRequest.message(),
    "ActionDeviceResponse": ActionDeviceResponse.message(),
    "ActionSensorResponse": ActionSensorResponse.message(),
    "RegisterResponse": RegisterResponse.message(),
    "SensorDataResponse": SensorDataResponse.message()
}
