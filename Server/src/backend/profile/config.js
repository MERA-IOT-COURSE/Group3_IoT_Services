const common = require("common")
const ConfigurationProfile = common.utils.profile.ConfigurationProfile
const databaseHandler = common.utils.database.mongodb
const logger = common.utils.logging.logger

const profileSchema = require("./profile")

var containerMongoDb = null

class ServerConfigurationProfile extends ConfigurationProfile {
    constructor(mongoDb) {
        super()
        containerMongoDb = mongoDb
    }

    async initialize() {
        this.database = await databaseHandler(containerMongoDb)
        this.profileClass = await this.database.model(this.collection, profileSchema(this.database))
        if (!(await this.get())) {
            await this.profileClass.create({}).catch(err => {
                logger.error(err)
            })
        }
    }

    async get() {
        return await this.profileClass.findOne()
    }

    async update(profileValues) {
        await this.profileClass.updateOne({ _id: profileValues._id }, profileValues)
    }
}

module.exports = ServerConfigurationProfile
