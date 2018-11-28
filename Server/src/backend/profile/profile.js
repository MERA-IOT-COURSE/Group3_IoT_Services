const Profile = require('models').objects.Profile

class ServerProfile extends Profile {
    constructor(options = {}) {
        super(options)
    }
}

module.exports = ServerProfile
