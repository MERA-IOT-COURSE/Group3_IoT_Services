const common = require("common")
const logger = common.utils.logging.logger

class Devices {
    constructor(mongoDb) {
        this.collection = "devices"
        this.database = mongoDb
    }

    async initialize() {
        const divicesSchema = new this.database.Schema({
            _id: { type: String, default: "" },
            name: { type: String, default: "" },
            sensors: { type: [] },
            actions: { type: [] }
        })

        this.devicesClass = await this.database.model(this.collection, divicesSchema)
        if ((await this.get()).length === 0) {
            await this.devicesClass.create().catch(err => {
                logger.error(err)
            })
        }
    }

    async get(id = null) {
        if (id === null || id === "" || id === undefined) {
            return await this.devicesClass.find().catch(err => {
                logger.error(err)
            })
        }
        else {
            return await this.devicesClass.find({ id: id }).catch(err => {
                logger.error(err)
            })
        }
    }

    async save(device) {
        await this.devicesClass.findOneAndUpdate(
            { _id: device.id },
            {
                _id: device.id,
                name: device.name,
                sensors: device.sensors,
                actions: device.actions
            },
            { upsert: true }
        ).catch(err => {
            logger.error(err)
        })
    }
}

module.exports = Devices