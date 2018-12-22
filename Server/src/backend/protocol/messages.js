const common = require("common")
const MessagesEnum = common.models.protocol.enums.Messages
const Messages = common.utils.protocol.Messages
const logger = common.utils.logging.logger

class ServerMessages extends Messages {
    constructor(mongoDb) {
        super()
        this.database = mongoDb
    }

    async initialize() {
        const messageSchema = new this.database.Schema({
            message: { type: String, default: "" },
            data: { type: [] }
        })

        this.messageClass = await this.database.model(this.collection, messageSchema)
        if ((await this.get()).length === 0) {
            var values = []
            for (var message in MessagesEnum) {
                values.push({ message: MessagesEnum[message], data: [] })
            }
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

    async saveIncoming(topic, message, data, datetime = new Date()) {
        await this.save(topic, message, data, "INCOMING", datetime = new Date())
    }

    async saveOutcoming(topic, message, data, datetime = new Date()) {
        await this.save(topic, message, data, "OUTCOMING", datetime = new Date())
    }

    async save(topic, message, data, comment, datetime = new Date()) {
        data["topic"] = topic
        data["comment"] = comment
        data["datetime"] = datetime

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