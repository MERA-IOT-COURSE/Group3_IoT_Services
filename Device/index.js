const common = require("common")
const launcher = common.utils.web.launcher
const Server = common.models.containers.Server

const Protocol = require("./src/backend/protocol/device")
const Messages = require("./src/backend/protocol/messages")
const ConfigurationProfile = require("./src/backend/profile/config")
const Requests = require("./src/backend/web/requests")

const static = require("path").join(__dirname, "./src")

const messages = new Messages()
messages.initialize()

const protocol = new Protocol(messages)

const configurationProfile = new ConfigurationProfile()
configurationProfile.initialize()

const requests = new Requests(protocol, configurationProfile)
requests.prepare()

const server = new Server({
    port: 11297,
    static: static,
    requests: requests
})

launcher(server)
