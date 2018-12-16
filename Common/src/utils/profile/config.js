const AbstractNotImplementedError = require("../errors/implementation").AbstractNotImplementedError

class ConfigurationProfile {
    constructor() {
        this.collection = "profile"
    }

    initialize() {
        throw new AbstractNotImplementedError()
    }

    get() {
        throw new AbstractNotImplementedError()
    }

    update(profileValues) {
        throw new AbstractNotImplementedError()
    }
}

module.exports = ConfigurationProfile
