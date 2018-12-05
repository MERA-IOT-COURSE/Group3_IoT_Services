const Profile = require("models").containers.Profile

class ServerProfile extends Profile {
    constructor(options = {}) {
        super(options)
    }
}

module.exports = ServerProfile
