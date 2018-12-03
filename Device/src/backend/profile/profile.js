const Profile = require("models").objects.Profile

class DeviceProfile extends Profile {
    constructor(options = {}) {
        super(options)
        this.device = options["device"]
    }
}

module.exports = DeviceProfile
