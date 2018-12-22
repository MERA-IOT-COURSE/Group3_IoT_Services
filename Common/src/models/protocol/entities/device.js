const Entity = require("../entity")

class Device extends Entity {
    static parse(data) {
        const Sensor = require("./sensor")
        const Action = require("./action")

        var id = data["hw_id"]
        var name = data["name"]
        var sensors = data.hasOwnProperty("sensors") && data["sensors"] !== null ?
            data["sensors"].map((sensor) => { return Sensor.parse(sensor) }) : []
        var actions = data.hasOwnProperty("actions") && data["actions"] !== null ?
            data["actions"].map((action) => { return Action.parse(action) }) : []
        return new Device(id, name, sensors, actions)
    }

    static transform(data) {
        const Sensor = require("./sensor")
        const Action = require("./action")

        var id = data["id"]
        var name = data["name"]
        var sensors = data.hasOwnProperty("sensors") && data["sensors"] !== null ?
            data["sensors"].map((sensor) => { return Sensor.parse(sensor) }) : []
        var actions = data.hasOwnProperty("actions") && data["actions"] !== null ?
            data["actions"].map((action) => { return Action.parse(action) }) : []
        return new Device(id, name, sensors, actions)
    }

    constructor(id, name, sensors = [], actions = []) {
        super()
        this.id = id
        this.name = name
        this.sensors = sensors
        this.actions = actions
    }

    properties() {
        var result = {
            "hw_id": this.id,
            "name": this.name
        }
        if (this.sensors != null && this.sensors.length > 0) {
            result["sensors"] = this.sensors.map((sensor) => { return sensor.properties() })
        }
        if (this.actions != null && this.actions.length > 0) {
            result["actions"] = this.actions.map((action) => { return action.properties() })
        }
        return result
    }
}

module.exports = Device
