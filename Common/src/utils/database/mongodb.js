const mongoose = require("mongoose")
const logger = require("../logging/logger").logger

async function initialize(mongoDb) {
    await mongoose.connect(mongoDb.getURIString(), mongoDb.getOptions(), err => {
        if (err) {
            logger.error(err)
            process.exit()
        }
        logger.info("MongoDB successfully connected")
    })
    return mongoose
}

module.exports = initialize