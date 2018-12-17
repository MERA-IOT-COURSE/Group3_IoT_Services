const common = require("common")
const launcher = common.utils.web.launcher
const Server = common.models.containers.Server

const Requests = require("./src/backend/web/requests")
const ConfigurationProfile = require("./src/backend/profile/config")

const static = require("path").join(__dirname, "./src")

const configurationProfile = new ConfigurationProfile()
configurationProfile.initialize()
const requests = new Requests(configurationProfile)

const server = new Server({
    static: static,
    requests: requests
})

launcher(server)
