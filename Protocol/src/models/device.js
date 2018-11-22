class Device {
    constructor(id, name, sensors, actions = null) {
        this.id = id
        this.name = name
        this.sensors = sensors
        this.actions = actions
    }

    dict() {
        var properties = {
            "hw_id": this.id,
            "name": this.name,
            "sensors": this.sensors
        }
        if (this.actions != null) {
            properties["actions"] = this.actions
        }
        return properties
    }
}

class Sensor {
    constructor(id, type, actions = null) {
        this.id = id
        this.type = type
        this.actions = actions
    }

    dict() {
        var properties = {
            "id": this.id,
            "type": this.type
        }
        if (this.actions != null) {
            properties["actions"] = this.actions
        }
        return properties
    }
}

class Action {
    constructor(id, name) {
        this.id = id
        this.name = name
    }

    dict() {
        return {
            "id": this.id,
            "name": this.name
        }
    }
}

module.exports = {
    "Device": Device,
    "Sensor": Sensor,
    "Action": Action
}