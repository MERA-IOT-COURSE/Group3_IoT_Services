const Entity = require("../entity")

class ActionDeviceResponseData extends Entity {
    static parse(data) {
        var id = data["id"]
        var status = data["status"]
        var _data = data.hasOwnProperty("data") ? data["data"] : null
        return new ActionDeviceResponseData(id, status, _data)
    }

    constructor(id, status, data = null) {
        super()
        this.id = id
        this.status = status
        this.data = data
    }

    properties() {
        var result = {
            "id": this.id,
            "status": this.status
        }
        if (this.data != null) {
            result["data"] = this.data
        }
        return result
    }
}

module.exports = ActionDeviceResponseData
