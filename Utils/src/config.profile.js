const AbstractNotImplementedError = require("./error.implementation").AbstractNotImplementedError

class ConfigurationProfile {
    constructor(profileClass) {
        this.profileClass = profileClass
    }

    get() {
        throw new AbstractNotImplementedError()
    }

    update(profileObject) {
        throw new AbstractNotImplementedError()
    }
}

module.exports = ConfigurationProfile
