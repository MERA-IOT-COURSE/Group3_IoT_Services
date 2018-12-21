const common = require("common")
const MessagesEnum = common.models.protocol.enums.Messages
const Messages = common.utils.protocol.Messages
const databaseHandler = common.utils.database.lowdb

class DeviceMessages extends Messages {
    constructor() {
        super()
        this.database = databaseHandler(`${this.collection}.json`)
    }

    initialize() {
        var values = {}
        for (var message in MessagesEnum) {
            values[MessagesEnum[message]] = []
        }
        this.database.defaults(values).write()
    }

    get(message) {
        return this.database.get(message).value()
    }

    save(topic, message, data, comment, datetime = new Date()) {
        data["topic"] = topic
        data["comment"] = comment
        data["datetime"] = datetime
        this.database.get(message).push(data).write()
    }
}

module.exports = DeviceMessages