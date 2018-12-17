const AbstractRequests = require("common").models.containers.AbstractRequests

class Requests extends AbstractRequests {
    constructor(configurationProfile) {
        super()
        this.configurationProfile = configurationProfile
    }

    get(app) {
        app.get("/", async (req, res) => {
            var profile = await this.configurationProfile.get()
            res.render("main", {
                profile: profile
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
