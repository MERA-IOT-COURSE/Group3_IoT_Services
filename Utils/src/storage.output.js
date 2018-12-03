const fs = require("fs")
const path = require("path")

function createDirectory(directory) {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory)
    }
    return directory
}

const output = createDirectory("output")

module.exports = {
    "logs": createDirectory(path.join(output, "logs"))
}
