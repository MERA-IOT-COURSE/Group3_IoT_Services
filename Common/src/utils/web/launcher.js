const ServerConfigurator = require("./configurator")

module.exports = (server) => {
    new ServerConfigurator(server)
        .setup()
        .launch()
}