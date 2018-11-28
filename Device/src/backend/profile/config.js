const ConfigurationProfile = require("utils").ConfigurationProfile

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('profile.json')
const db = low(adapter)

class DeviceConfigurationProfile extends ConfigurationProfile {
    constructor(profileClass) {
        super(profileClass)
        db.defaults({ "profile": new profileClass() }).write()
    }

    get() {
        return new this.profileClass(db.get("profile").value())
    }

    update(profileObject) {
        db.assign({ "profile": profileObject }).value()
    }
}

module.exports = DeviceConfigurationProfile
