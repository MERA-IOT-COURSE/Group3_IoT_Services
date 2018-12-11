const Entity = require("../entity")

class Sensor extends Entity {
    static parse(data) {
        const Action = require("./action")

        var id = data["id"]
        var type = data["type"]
        var actions = data.hasOwnProperty("actions") && data["actions"] !== null ?
            data["actions"].map((action) => { return Action.parse(action) }) : []
        return new Sensor(id, type, actions)
    }

    constructor(id, type, actions = []) {
        super()
        this.id = id
        this.type = type
        this.actions = actions
    }

    properties() {
        var result = {
            "id": this.id,
            "type": this.type
        }
        if (this.actions != null && this.actions.length > 0) {
            result["actions"] = this.actions.map((action) => { return action.properties() })
        }
        return result
    }
}

module.exports = Sensor
