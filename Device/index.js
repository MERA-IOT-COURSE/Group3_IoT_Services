const common = require("common")
const launcher = common.utils.web.launcher
const Server = common.models.containers.Server

const Requests = require("./src/backend/web/requests")

const static = require("path").join(__dirname, "./src")
const requests = new Requests()
const server = new Server({
    static: static,
    requests: requests
})

launcher(server)
