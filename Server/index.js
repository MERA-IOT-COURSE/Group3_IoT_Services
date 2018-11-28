const server = require("./src/backend/web/server")

const host = "0.0.0.0"
const port = 11296
server.launch(port, host)
