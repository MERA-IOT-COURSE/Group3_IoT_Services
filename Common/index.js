/*
 * Models block
 */

const AbstractRequests = require("./src/models/containers/requests")
const Server = require("./src/models/containers/server")
const MongoDB = require("./src/models/containers/mongodb")

const Device = require("./src/models/protocol/entities/device")
const Action = require("./src/models/protocol/entities/action")
const Sensor = require("./src/models/protocol/entities/sensor")
const Message = require("./src/models/protocol/entities/message")

const ActionsEnum = require("./src/models/protocol/enums/actions")
const MessagesEnum = require("./src/models/protocol/enums/messages")
const SensorsEnum = require("./src/models/protocol/enums/sensors")

const ActionDeviceRequestData = require("./src/models/protocol/data/request.action.device")
const ActionSensorRequestData = require("./src/models/protocol/data/request.action.sensor")
const RegisterRequestData = require("./src/models/protocol/data/request.register")
const ActionDeviceResponseData = require("./src/models/protocol/data/response.action.device")
const ActionSensorResponseData = require("./src/models/protocol/data/response.action.sensor")
const RegisterResponseData = require("./src/models/protocol/data/response.register")
const SensorData = require("./src/models/protocol/data/response.sensor")

const ActionDeviceRequest = require("./src/models/protocol/messages/request.action.device")
const ActionSensorRequest = require("./src/models/protocol/messages/request.action.sensor")
const RegisterRequest = require("./src/models/protocol/messages/request.register")
const ActionDeviceResponse = require("./src/models/protocol/messages/response.action.device")
const ActionSensorResponse = require("./src/models/protocol/messages/response.action.sensor")
const RegisterResponse = require("./src/models/protocol/messages/response.register")
const SensorDataResponse = require("./src/models/protocol/messages/response.sensor")

/*
 * Utils block
 */

const lowdb = require("./src/utils/database/lowdb")

const mongodb = require("./src/utils/database/mongodb")

const notImplementedErrors = require("./src/utils/errors/implementation")

const logs = require("./src/utils/logging/logger")

const ConfigurationProfile = require("./src/utils/profile/config")

const AbstractServer = require("./src/utils/protocol/server")
const AbstractDevice = require("./src/utils/protocol/device")
const Messages = require("./src/utils/protocol/messages")

const launcher = require("./src/utils/web/launcher")

/*
 * Exports block
 */

module.exports = {
    "models": {
        "containers": {
            "AbstractRequests": AbstractRequests,
            "Server": Server,
            "MongoDB": MongoDB
        },
        "protocol": {
            "entities": {
                "Device": Device,
                "Action": Action,
                "Sensor": Sensor,
                "Message": Message
            },
            "enums": {
                "Actions": ActionsEnum,
                "Messages": MessagesEnum,
                "Sensors": SensorsEnum
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
    },
    "utils": {
        "database": {
            "lowdb": lowdb,
            "mongodb": mongodb
        },
        "errors": {
            "AbstractNotImplementedError": notImplementedErrors.AbstractNotImplementedError,
            "StaticNotImplementedError": notImplementedErrors.StaticNotImplementedError
        },
        "logging": {
            "logger": logs.logger,
            "stream": logs.stream
        },
        "profile": {
            "ConfigurationProfile": ConfigurationProfile
        },
        "protocol": {
            "AbstractServer": AbstractServer,
            "AbstractDevice": AbstractDevice,
            "Messages": Messages
        },
        "web": {
            "launcher": launcher
        }
    }
}
