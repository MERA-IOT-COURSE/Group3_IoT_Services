const common = require("common")
const AbstractRequests = common.models.containers.AbstractRequests
const Actions = common.models.protocol.enums.Actions
const Sensors = common.models.protocol.enums.Sensors
const Device = common.models.protocol.entities.Device
const Sensor = common.models.protocol.entities.Sensor
const MessagesEnum = common.models.protocol.enums.Messages

function getActions(array, actionsDict) {
    return [].concat(array).map(action => {
        for (var defAction in actionsDict.Common) {
            if (defAction === action) {
                return { id: action, name: actionsDict.Common[action] }
            }
        }
        for (var defAction in actionsDict.Custom) {
            if (defAction === action) {
                return { id: action, name: actionsDict.Custom[action] }
            }
        }
    })
}

class Requests extends AbstractRequests {
    constructor(configurationProfile, messages) {
        super()
        this.configurationProfile = configurationProfile
        this.messages = messages
    }

    get(app) {
        app.get("/", (req, res) => {
            var messages = {
                "titles": Object.keys(MessagesEnum).map(key => MessagesEnum[key]),
                "data": Object.keys(MessagesEnum).map(key => this.messages.get(MessagesEnum[key]))
            }
            res.render("main", {
                profile: this.configurationProfile.get(),
                Actions: Actions,
                Sensors: Sensors,
                messages: messages
            })
        })
    }

    post(app) {
        app.post("/profile/device", (req, res) => {
            var profile = this.configurationProfile.get()
            profile.active = req.body["active"]
            profile.device = new Device(req.body["device[id]"], req.body["device[name]"], [])
            if (req.body["device[actions][]"] !== "null") {
                profile.device.actions = getActions(req.body["device[actions][]"], Actions.Device)
            } else {
                profile.device.actions = []
            }
            this.configurationProfile.update(profile)
            res.send()
        })
        app.post("/profile/sensor", (req, res) => {
            var profile = this.configurationProfile.get()
            var sensor = new Sensor(req.body["sensor[id]"], req.body["sensor[type]"])
            if (req.body["sensor[actions][]"] !== "null") {
                sensor.actions = getActions(req.body["sensor[actions][]"], Actions.Sensor)
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
                        profile.backendID = req.body[key]
                        break
                    case "broker[host]":
                        profile.broker.host = req.body[key]
                        break
                    case "broker[port]":
                        profile.broker.port = req.body[key]
                        break
                    case "active":
                        profile.active = req.body[key] === "true"
                        break
                    case "device[id]":
                        profile.device.id = req.body[key]
                        break
                    case "device[name]":
                        profile.device.name = req.body[key]
                        break
                    case "device[actions][]":
                        if (req.body[key] !== "null") {
                            profile.device.actions = getActions(req.body[key], Actions.Device)
                        } else {
                            profile.device.actions = []
                        }
                        break
                    case "sensor[id]":
                        profile.device.sensors[parseInt(req.body["sensor[index]"])].id = req.body[key]
                        break
                    case "sensor[type]":
                        profile.device.sensors[parseInt(req.body["sensor[index]"])].type = req.body[key]
                        break
                    case "sensor[actions][]":
                        if (req.body[key] !== "null") {
                            profile.device.sensors[parseInt(req.body["sensor[index]"])].actions = getActions(req.body[key], Actions.Sensor)
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
