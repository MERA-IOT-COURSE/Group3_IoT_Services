const common = require("common")
const Messages = common.utils.protocol.Messages
const databaseHandler = common.utils.database.lowdb

const ActionDeviceRequest = common.models.protocol.messages.ActionDeviceRequest
const ActionSensorRequest = common.models.protocol.messages.ActionSensorRequest
const RegisterRequest = common.models.protocol.messages.RegisterRequest
const ActionDeviceResponse = common.models.protocol.messages.ActionDeviceResponse
const ActionSensorResponse = common.models.protocol.messages.ActionSensorResponse
const RegisterResponse = common.models.protocol.messages.RegisterResponse
const SensorResponse = common.models.protocol.messages.SensorDataResponse

class DeviceMessages extends Messages {
    constructor() {
        super()
        this.database = databaseHandler(`${this.collection}.json`)
    }

    initialize() {
        var values = {}
        values[ActionDeviceRequest.message()] = []
        values[ActionSensorRequest.message()] = []
        values[RegisterRequest.message()] = []
        values[ActionDeviceResponse.message()] = []
        values[ActionSensorResponse.message()] = []
        values[RegisterResponse.message()] = []
        values[SensorResponse.message()] = []
        this.database.defaults(values).write()
    }

    get(message) {
        return this.database.get(message).value()
    }

    save(message, data) {
        this.database.get(message).push(data).write()
    }
}

module.exports = DeviceMessages