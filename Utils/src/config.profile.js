const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('profile.json')
const db = low(adapter)

class ConfigurationProfile {
    constructor(profile) {
        this.profile = profile
        db.defaults({ "profile": new profile() }).write()
    }

    get() {
        return new this.profile(db.get("profile").value())
    }

    update(profile) {
        db.assign({ "profile": profile }).value()
    }
}

module.exports = ConfigurationProfile
