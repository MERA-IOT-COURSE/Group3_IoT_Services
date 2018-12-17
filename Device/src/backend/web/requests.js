const common = require("common")
const AbstractRequests = common.models.containers.AbstractRequests
const Actions = common.models.protocol.enums.Actions
const Sensors = common.models.protocol.enums.Sensors
const Device = common.models.protocol.entities.Device
const Sensor = common.models.protocol.entities.Sensor

class Requests extends AbstractRequests {
    constructor(configurationProfile) {
        super()
        this.configurationProfile = configurationProfile
    }

    get(app) {
        app.get("/", (req, res) => {
            res.render("main", {
                profile: this.configurationProfile.get(),
                Actions: Actions,
                Sensors: Sensors
            })
        })
    }

    post(app) {
        app.post("/profile/device", (req, res) => {
            var profile = this.configurationProfile.get()
            profile.active = req.body["active"]
            profile.device = new Device(req.body["device[id]"], req.body["device[name]"], [])
            if (req.body["device[actions][]"] !== "null") {
                var actions = [].concat(req.body["device[actions][]"])
                profile.device.actions = actions.map(action => {
                    for (var deviceAction in Actions.Device.Common) {
                        if (deviceAction === action) {
                            return { id: action, name: Actions.Device.Common[action] }
                        }
                    }
                    for (var deviceAction in Actions.Device.Custom) {
                        if (deviceAction === action) {
                            return { id: action, name: Actions.Device.Custom[action] }
                        }
                    }
                })
            } else {
                profile.device.actions = []
            }
            this.configurationProfile.update(profile)
            res.send()
        })
        app.post("/profile/sensor", (req, res) => {
            var profile = this.configurationProfile.get()
            console.log(req.body)
            var sensor = new Sensor(req.body["sensor[id]"], req.body["sensor[type]"])
            if (req.body["sensor[actions][]"] !== "null") {
                var actions = [].concat(req.body["sensor[actions][]"])
                sensor.actions = actions.map(action => {
                    for (var sensorAction in Actions.Sensor.Common) {
                        if (sensorAction === action) {
                            return { id: action, name: Actions.Sensor.Common[action] }
                        }
                    }
                    for (var sensorAction in Actions.Sensor.Custom) {
                        if (sensorAction === action) {
                            return { id: action, name: Actions.Sensor.Custom[action] }
                        }
                    }
                })
            } else {
                sensor.actions = []
            }
            profile.device.sensors.push(sensor)
            this.configurationProfile.update(profile)
            res.send()
        })
    }

    put(app) {
        app.put("/profile", (req, res) => {
            var profile = this.configurationProfile.get()
            for (var key in req.body) {
                switch (key) {
                    case "backendId":
                        profile[key] = req.body[key]
                    case "broker[host]":
                        profile.broker.host = req.body[key]
                        break
                    case "broker[port]":
                        profile.broker.port = req.body[key]
                        break
                    case "active":
                        profile.active = req.body[key]
                        break
                    case "device[id]":
                        profile.device.id = req.body[key]
                        break
                    case "device[name]":
                        profile.device.name = req.body[key]
                        break
                    case "device[actions][]":
                        if (req.body[key] !== "null") {
                            var actions = [].concat(req.body[key])
                            profile.device.actions = actions.map(action => {
                                for (var deviceAction in Actions.Device.Common) {
                                    if (deviceAction === action) {
                                        return { id: action, name: Actions.Device.Common[action] }
                                    }
                                }
                                for (var deviceAction in Actions.Device.Custom) {
                                    if (deviceAction === action) {
                                        return { id: action, name: Actions.Device.Custom[action] }
                                    }
                                }
                            })
                        } else {
                            profile.device.actions = []
                        }
                        break
                    case "sensor[index]":
                        break
                    case "sensor[id]":
                        profile.device.sensors[parseInt(req.body["sensor[index]"])].id = req.body[key]
                        break
                    case "sensor[type]":
                        profile.device.sensors[parseInt(req.body["sensor[index]"])].type = req.body[key]
                        break
                    case "sensor[actions][]":
                        if (req.body[key] !== "null") {
                            var actions = [].concat(req.body[key])
                            profile.device.sensors[parseInt(req.body["sensor[index]"])].actions = actions.map(action => {
                                for (var deviceAction in Actions.Sensor.Common) {
                                    if (deviceAction === action) {
                                        return { id: action, name: Actions.Sensor.Common[action] }
                                    }
                                }
                                for (var deviceAction in Actions.Sensor.Custom) {
                                    if (deviceAction === action) {
                                        return { id: action, name: Actions.Sensor.Custom[action] }
                                    }
                                }
                            })
                        } else {
                            profile.device.sensors[parseInt(req.body["sensor[index]"])].actions = []
                        }
                        break
                }
            }
            this.configurationProfile.update(profile)
            res.send()
        })
    }

    delete(app) {
        app.delete("/profile/device", (req, res) => {
            var profile = this.configurationProfile.get()
            profile.device = null
            this.configurationProfile.update(profile)
            res.send()
        })
        app.delete("/profile/sensor/:index", (req, res) => {
            var profile = this.configurationProfile.get()
            profile.device.sensors.splice(req.params.index, 1)
            this.configurationProfile.update(profile)
            res.send()
        })
    }
}

module.exports = Requests
