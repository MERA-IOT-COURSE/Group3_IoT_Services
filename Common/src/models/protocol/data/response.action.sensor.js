const Entity = require("../entity")

class ActionSensorResponseData extends Entity {
    static parse(data) {
        var id = data["id"]
        var sensorId = data["sensor_id"]
        var status = data["status"]
        var _data = data.hasOwnProperty("data") ? data["data"] : null
        return new ActionSensorResponseData(id, sensorId, status, _data)
    }

    constructor(id, sensorId, status, data = null) {
        super()
        this.id = id
        this.sensorId = sensorId
        this.status = status
        this.data = data
    }

    properties() {
        var result = {
            "id": this.id,
            "sensor_id": this.sensorId,
            "status": this.status
        }
        if (this.data != null) {
            result["data"] = this.data
        }
        return result
    }
}

module.exports = ActionSensorResponseData
