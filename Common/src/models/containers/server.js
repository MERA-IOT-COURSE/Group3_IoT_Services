class Server {
    constructor(options = {}) {
        this.host = options["host"] || "0.0.0.0"
        this.port = options["port"] || 11296
        this.static = options["static"] || require("path").join(__dirname, "../../../../")
        this.requests = options["requests"] || []
    }
}

module.exports = Server
