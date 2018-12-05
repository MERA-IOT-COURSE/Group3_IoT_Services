const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const localdbDirectory = require("../storage/output").localdb
const path = require("path")

function create(filePath) {
    const adapter = new FileSync(path.join(localdbDirectory, filePath))
    return low(adapter)
}

module.exports = create
