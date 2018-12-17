const common = require("common")
const Messages = common.utils.protocol.Messages
const databaseHandler = common.utils.database.mongodb
const logger = common.utils.logging.logger

const ActionDeviceRequest = common.models.protocol.messages.ActionDeviceRequest
const ActionSensorRequest = common.models.protocol.messages.ActionSensorRequest
const RegisterRequest = common.models.protocol.messages.RegisterRequest
const ActionDeviceResponse = common.models.protocol.messages.ActionDeviceResponse
const ActionSensorResponse = common.models.protocol.messages.ActionSensorResponse
const RegisterResponse = common.models.protocol.messages.RegisterResponse
const SensorResponse = common.models.protocol.messages.SensorDataResponse

const values =
    [
        { message: ActionDeviceRequest.message(), data: [] },
        { message: ActionSensorRequest.message(), data: [] },
        { message: RegisterRequest.message(), data: [] },
        { message: ActionDeviceResponse.message(), data: [] },
        { message: ActionSensorResponse.message(), data: [] },
        { message: RegisterResponse.message(), data: [] },
        { message: SensorResponse.message(), data: [] }
    ]

var containerMongoDb = null

class ServerMessages extends Messages {
    constructor(mongoDb) {
        super()
        containerMongoDb = mongoDb
    }

    async initialize() {
        this.database = await databaseHandler(containerMongoDb)
        const messageSchema = new this.database.Schema({
            message: { type: String, default: "" },
            data: { type: [] }
        })

        this.messageClass = await this.database.model(this.collection, messageSchema)
        if ((await this.get()).length === 0) {
            await this.messageClass.create(values).catch(err => {
                logger.error(err)
            })
        }
    }

    async get(message = null) {
        if (message === null || message === "" || message === undefined) {
            return await this.messageClass.find().catch(err => {
                logger.error(err)
            })
        }
        else {
            return await this.messageClass.find({ message: message }).catch(err => {
                logger.error(err)
            })
        }
    }

    async save(message, data) {
        var updatedData = []
        if ((await this.get(message)).length !== 0) {
            var currentData = await this.messageClass.findOne({ message: message }, { data: 1, _id: 0 })
            for (var i = 0; i < currentData.data.length; i++) {
                updatedData.push(currentData.data[i])
            }
        }

        updatedData.push(data)

        await this.messageClass.updateOne(
            { message: `${message}` },
            { message: `${message}`, data: updatedData },
            { upsert: true }
        ).catch(err => {
            logger.error(err)
        })
    }
}

module.exports = ServerMessages