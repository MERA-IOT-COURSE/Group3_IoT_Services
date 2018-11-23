const Entity = require("../entity")

class ActionSensorRequestData extends Entity {
    static parse(data) {
        var id = data["id"]
        var sensorId = data["sensor_id"]
        return new ActionSensorRequestData(id, sensorId)
    }

    constructor(id, sensorId) {
        super()
        this.id = id
        this.sensorId = sensorId
    }

    properties() {
        return {
            "id": this.id,
            "sensor_id": this.sensorId
        }
    }
}

module.exports = ActionSensorRequestData
