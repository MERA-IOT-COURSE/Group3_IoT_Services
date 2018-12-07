const Profile = require("common").models.containers.Profile

class ServerProfile extends Profile {
    constructor(options = {}) {
        super(options)
    }
}

module.exports = ServerProfile
