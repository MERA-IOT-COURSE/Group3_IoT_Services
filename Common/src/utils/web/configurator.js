const express = require("express")
const path = require("path")
const morgan = require("morgan")
const stream = require("../logging/logger").stream

const pattern = ":remote-addr - :remote-user \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\""

class ServerConfigurator {
    constructor(server) {
        this.server = server
        this.app = express()
    }

    setup() {
        this.app.engine("html", require("ejs").renderFile)
        this.app.set("view engine", "ejs")
        this.app.set("views", path.join(this.server.static, "views"))
        this.app.use(express.static(this.server.static))
        this.app.use(morgan(pattern, { stream: stream }))
        this.server.requests.methods().forEach(method => method(this.app))
        return this
    }

    launch() {
        this.launched = this.app.listen(this.server.port, this.server.host)
    }

    stop() {
        this.launched.close()
    }
}

module.exports = ServerConfigurator
