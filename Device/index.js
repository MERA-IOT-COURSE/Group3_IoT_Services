const common = require("common")
const launcher = common.utils.web.launcher
const Server = common.models.containers.Server

const ConfigurationProfile = require("./src/backend/profile/config")
const Messages = require("./src/backend/protocol/messages")
const Requests = require("./src/backend/web/requests")

const static = require("path").join(__dirname, "./src")

const configurationProfile = new ConfigurationProfile()
configurationProfile.initialize()

const messages = new Messages()
messages.initialize()

const requests = new Requests(configurationProfile, messages)

const server = new Server({
    static: static,
    requests: requests
})

launcher(server)
