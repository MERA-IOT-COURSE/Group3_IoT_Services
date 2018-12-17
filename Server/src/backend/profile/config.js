const common = require("common")
const ConfigurationProfile = common.utils.profile.ConfigurationProfile
const logger = common.utils.logging.logger

const profileSchema = require("./profile")

class ServerConfigurationProfile extends ConfigurationProfile {
    constructor(mongoDb) {
        super()
        this.database = mongoDb
    }

    async initialize() {
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
