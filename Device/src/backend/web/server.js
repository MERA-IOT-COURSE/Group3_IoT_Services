const Express = require("express")
const requests = require("./requests")
const path = require('path')
const morgan = require("morgan")
const stream = require("utils").logs.stream

const staticPath = path.join(__dirname, '../../')
const viewsPath = path.join(staticPath, 'views')

class ServerHandler {
    constructor(port, host) {
        this.port = port
        this.host = host
        this.app = Express()
    }

    setup() {
        this.app.engine('html', require('ejs').renderFile)
        this.app.set('view engine', 'ejs')
        this.app.set('views', viewsPath)
        this.app.use(Express.static(staticPath))
        const pattern = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
        this.app.use(morgan(pattern, { stream: stream }))

        requests.all(this.app)

        return this
    }

    launch() {
        this.app.listen(this.port, this.host)
    }
}

class Server {
    launch(port, host) {
        new ServerHandler(port, host).setup().launch()
    }
}

module.exports = new Server()
