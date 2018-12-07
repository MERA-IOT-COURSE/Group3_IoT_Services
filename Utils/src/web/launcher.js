const ServerConfigurator = require("./configurator")

function launcher(server) {
    new ServerConfigurator(server)
        .setup()
        .launch()
}

module.exports = launcher