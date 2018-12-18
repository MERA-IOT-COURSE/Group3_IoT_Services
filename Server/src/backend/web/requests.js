const common = require("common")
const AbstractRequests = common.models.containers.AbstractRequests
const MessagesEnum = common.models.protocol.enums.Messages

class Requests extends AbstractRequests {
    constructor(configurationProfile, messages) {
        super()
        this.configurationProfile = configurationProfile
        this.messages = messages
    }

    get(app) {
        app.get("/", async (req, res) => {
            var profile = await this.configurationProfile.get()
            var data = []
            for (var key in MessagesEnum) {
                data.push(await this.messages.get(MessagesEnum[key]))
            }
            var messages = {
                "titles": Object.keys(MessagesEnum).map(key => MessagesEnum[key]),
                "data": data.map(entity => entity[0].data)
            }
            res.render("main", {
                profile: profile,
                messages: messages
            })
        })
    }

    put(app) {
        app.put("/profile", async (req, res) => {
            var profile = await this.configurationProfile.get()
            for (var key in req.body) {
                switch (key) {
                    case "backendId":
                        profile.backendId = req.body[key]
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
                }
            }
            await this.configurationProfile.update(profile)
            res.send()
        })
    }
}

module.exports = Requests
