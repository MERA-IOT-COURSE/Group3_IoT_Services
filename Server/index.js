const launcher = require("utils").web.launcher
const Server = require("models").containers.Server
const Requests = require("./src/backend/web/requests")

launcher(new Server({ requests: new Requests() }))
