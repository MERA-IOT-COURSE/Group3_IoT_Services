const common = require("common")
const launcher = common.utils.web.launcher
const Server = common.models.containers.Server
const MongoDB = common.models.containers.MongoDB
const databaseHandler = common.utils.database.mongodb

const ConfigurationProfile = require("./src/backend/profile/config")
const Messages = require("./src/backend/protocol/messages")
const Devices = require("./src/backend/protocol/devices")
const Requests = require("./src/backend/web/requests")

const static = require("path").join(__dirname, "./src")

const mongoDb = new MongoDB({ user: "user", password: "user" })
databaseHandler(mongoDb).then(async database => {
    const configurationProfile = new ConfigurationProfile(database)
    await configurationProfile.initialize()

    const messages = new Messages(database)
    await messages.initialize()

    const devices = new Devices(database)
    await devices.initialize()

    const requests = new Requests(configurationProfile, messages, devices)

    const server = new Server({
        static: static,
        requests: requests
    })

    launcher(server)
})
