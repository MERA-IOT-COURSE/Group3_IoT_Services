const common = require("common")
const AbstractRequests = common.models.containers.AbstractRequests
const MessagesEnum = common.models.protocol.enums.Messages

class Requests extends AbstractRequests {
    constructor(protocol, configurationProfile) {
        super()
        this.protocol = protocol
        this.configurationProfile = configurationProfile
    }

    prepare() {
        var profile = await this.configurationProfile.get()
        this.protocol.initialize(profile)
    }

    get(app) {
        app.get("/", async (req, res) => {
            var profile = await this.configurationProfile.get()
            var data = []
            for (var key in MessagesEnum) {
                data.push(await this.protocol.messages.get(MessagesEnum[key]))
            }
            var messages = {
                "titles": Object.keys(MessagesEnum).map(key => MessagesEnum[key]),
                "data": data.map(entity => entity[0].data)
            }
            var devices = await this.devices.get()
            res.render("main", {
                profile: profile,
                messages: messages,
                devices: devices
            })
        })
    }

    put(app) {
        app.put("/profile", async (req, res) => {
            var changeProtocolHandlerState = false
            var reSetupProtocolHandler = false

            var profile = await this.configurationProfile.get()
            for (var key in req.body) {
                switch (key) {
                    case "backendId":
                        if (!reSetupProtocolHandler && profile.backendId != req.body[key]) {
                            reSetupProtocolHandler = true
                        }
                        profile.backendId = req.body[key]
                        break
                    case "broker[host]":
                        if (!reSetupProtocolHandler && profile.broker.host != req.body[key]) {
                            reSetupProtocolHandler = true
                        }
                        profile.broker.host = req.body[key]
                        break
                    case "broker[port]":
                        if (!reSetupProtocolHandler && profile.broker.port != req.body[key]) {
                            reSetupProtocolHandler = true
                        }
                        profile.broker.port = req.body[key]
                        break
                    case "active":
                        if (!changeProtocolHandlerState && profile.active != req.body[key]) {
                            changeProtocolHandlerState = true
                        }
                        profile.active = req.body[key] === "true"
                        break
                }
            }

            if (changeProtocolHandlerState) {
                if (profile.active) {
                    this.protocol.initialize(profile)
                } else {
                    this.protocol.end()
                }
            }

            if (reSetupProtocolHandler) {
                this.protocol.initialize(profile)
            }

            await this.configurationProfile.update(profile)
            res.send()
        })
    }
}

module.exports = Requests
