const Profile = require("common").models.containers.Profile

class DeviceProfile extends Profile {
    constructor(options = {}) {
        super(options)
        this.device = options["device"]
    }
}

module.exports = DeviceProfile
