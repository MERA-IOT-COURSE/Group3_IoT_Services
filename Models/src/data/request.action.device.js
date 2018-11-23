const Entity = require("../entity")

class ActionDeviceRequestData extends Entity {
    static parse(data) {
        var id = data["id"]
        return new ActionDeviceRequestData(id)
    }

    constructor(id) {
        super()
        this.id = id
    }

    properties() {
        return {
            "id": this.id
        }
    }
}

module.exports = ActionDeviceRequestData
