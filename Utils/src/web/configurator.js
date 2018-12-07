const express = require("express")
const path = require("path")
const morgan = require("morgan")
const stream = require("utils").logging.stream

var staticPath = path.join(__dirname, "../../")
var viewsPath = path.join(staticPath, "views")

const pattern = ":remote-addr - :remote-user \":method :url HTTP/:http-version\" :status :res[content-length] \":referrer\" \":user-agent\""

class ServerConfigurator {
    constructor(server) {
        this.server = server
        this.app = express()
    }

    setup() {
        this.app.engine("html", require("ejs").renderFile)
        this.app.set("view engine", "ejs")
        this.app.set("views", viewsPath)
        this.app.use(express.static(staticPath))
        this.app.use(morgan(pattern, { stream: stream }))
        this.server.requests.methods().forEach(method => method(this.app))
        return this
    }

    launch() {
        this.app.listen(this.server.port, this.server.host)
    }
}

module.exports = ServerConfigurator
