const DeviceProfile = require("./profile")

const common = require("common")
const ConfigurationProfile = common.utils.profile.ConfigurationProfile
const databaseHandler = common.utils.database.lowdb

class DeviceConfigurationProfile extends ConfigurationProfile {
    constructor() {
        super()
        this.profileClass = DeviceProfile
        this.database = databaseHandler(`${this.collection}.json`)
    }

    initialize() {
        var values = {}
        values[this.collection] = new this.profileClass()
        this.database.defaults(values).write()
    }

    get() {
        return new this.profileClass(this.database.get(this.collection).value())
    }

    update(profileValues) {
        var values = {}
        values[this.collection] = profileValues
        this.database.assign(values).write()
    }
}

module.exports = DeviceConfigurationProfile
