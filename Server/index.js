const common = require("common")
const launcher = common.utils.web.launcher
const Server = common.models.containers.Server
const MongoDB = common.models.containers.MongoDB

const ConfigurationProfile = require("./src/backend/profile/config")
const Requests = require("./src/backend/web/requests")

const static = require("path").join(__dirname, "./src")

const mongoDb = new MongoDB({ user: "user", password: "user" })
const configurationProfile = new ConfigurationProfile(mongoDb)
configurationProfile.initialize().then(() => {
    const requests = new Requests(configurationProfile)

    const server = new Server({
        static: static,
        requests: requests
    })

    launcher(server)
})
