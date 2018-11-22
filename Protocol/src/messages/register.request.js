const Request = require("./base.instances").Request

class RegisterRequest extends Request {
    constructor(version, device) {
        super()
        this.version = version
        this.device = device
    }

    static message() {
        return "REGISTER"
    }

    dict() {
        var properties = {
            "version": this.version,
            "hw_id": this.device.id,
            "name": this.device.name,
            "sensors": this.device.sensors
        }
        if (this.actions != null) {
            properties["actions"] = this.device.actions
        }
        return properties
    }
}

module.exports = {
    "RegisterRequest": RegisterRequest
}