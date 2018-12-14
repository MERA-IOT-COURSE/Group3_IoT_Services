const mongoose = require("mongoose")
const logger = require("../logging/logger").logger

function initialize(mongo) {
    mongoose.connect(mongo.getURIString(), mongo.getOptions()).then(
        () => logger.info("Mongo successfully connected"),
        err => {
            logger.error(err)
            process.exit()
        }
    )
    return mongoose
}

module.exports = initialize