const common = require("common")
const AbstractRequests = common.models.containers.AbstractRequests
const MessagesEnum = common.models.protocol.enums.Messages
const logger = common.utils.logging.logger

class Requests extends AbstractRequests {
    constructor(protocol, configurationProfile) {
        super()
        this.protocol = protocol
        this.configurationProfile = configurationProfile
    }

    async prepare() {
        var profile = await this.configurationProfile.get()
        this.protocol.initialize(profile)
    }

    get(app) {
        app.get("/", async (req, res) => {
            var profile = await this.configurationProfile.get()
            var devices = await this.protocol.devices.get()
            res.render("main", {
                profile: profile,
                devices: devices
            })
        })
        app.get("/messages", async (req, res) => {
            var data = []
            for (var key in MessagesEnum) {
                data.push(await this.protocol.messages.get(MessagesEnum[key]))
            }
            var messages = {
                "titles": Object.keys(MessagesEnum).map(key => MessagesEnum[key]),
                "data": data.map(entity => entity[0].data)
            }
            res.render("messages", {
                messages: messages
            }, (err, html) => {
                if (err) {
                    logger.error(err)
                    throw err
                } else {
                    res.send(html)
                }
            })
        })
    }

    put(app) {
        app.put("/profile", async (req, res) => {
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
                }
            }

            if (profile.active && reSetupProtocolHandler) {
                this.protocol.initialize(profile)
            }

            await this.configurationProfile.update(profile)
            res.send()
        })
        app.put("/active", async (req, res) => {
            var profile = await this.configurationProfile.get()

            var changeProtocolHandlerState = profile.active !== (req.body["active"] === "true")
            profile.active = req.body["active"] === "true"

            if (changeProtocolHandlerState) {
                if (profile.active) {
                    this.protocol.initialize(profile)
                } else {
                    this.protocol.end()
                }
            }

            await this.configurationProfile.update(profile)
        })
    }
}

module.exports = Requests
