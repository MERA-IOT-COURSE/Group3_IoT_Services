const MQTT = require("mqtt")

const Message = require("../../models/protocol/entities/message")
const AbstractNotImplementedError = require("../errors/implementation").AbstractNotImplementedError
const logger = require("../logging/logger").logger

class AbstractHost {
    constructor(messages) {
        this.messages = messages
        this.client = null
    }

    init(profile) {
        this.profile = profile

        if (this.client == null || !this.client.connected) {
            logger.info("Begin to setup host")
        } else {
            logger.info("Begin to re-setup host")
            this.client.end()
        }

        logger.debug(`Connecting to the broker: ${JSON.stringify(this.profile.broker)}`)
        this.client = MQTT.connect(`mqtt://${this.profile.broker.host}:${this.profile.broker.port}`)
        this.client.on("connect", () => {
            logger.debug("Connected to the broker")
            this.prepare()
            logger.info("Host is prepared")
        })

        process.on("exit", () => this.closeClientAndExit())
        process.on("SIGINT", () => process.exit())
        process.on("uncaughtException", () => process.exit())
    }

    prepare() {
        throw new AbstractNotImplementedError()
    }

    getMessage(topic, messageData) {
        var data = JSON.parse(messageData.toString())
        var message = Message.parse(data)
        this.topicsListener(topic, message)
    }

    topicsListener(topic, message) {
        throw new AbstractNotImplementedError()
    }

    subscribe(topic) {
        this.client.subscribe(topic)
        logger.info(`Subscribed on: '${topic}'`)
    }

    handleMessage(exchangeInstance, topic, data, callback) {
        logger.debug(`The message was got ('${exchangeInstance.message()}' <- '${topic}'):\n - ${JSON.stringify(data.properties())}`)
        this.messages.saveIncoming(topic, exchangeInstance.message(), data)
        callback()
        logger.debug(`The message was handled ('${exchangeInstance.message()}' <- '${topic}')`)
    }

    handleMessageWithResult(exchangeInstance, topic, data, callback) {
        logger.debug(`The message was got ('${exchangeInstance.message()}' <- '${topic}'):\n - ${JSON.stringify(data.properties())}`)
        this.messages.saveIncoming(topic, exchangeInstance.message(), data)
        var result = callback()
        logger.debug(`The message was handled ('${exchangeInstance.message()}' <- '${topic}')`)
        return result
    }

    sendMessage(exchangeInstance, topic, data) {
        logger.debug(`Sending the message ('${exchangeInstance.message()}' -> '${topic}'):\n - ${JSON.stringify(data.properties())}`)
        this.messages.saveOutcoming(topic, exchangeInstance.message(), data)
        this.client.publish(topic, new exchangeInstance(data).create())
        logger.debug(`The message was sent ('${exchangeInstance.message()}' -> '${topic}')`)
    }

    end() {
        logger.debug("Disconnecting from the broker")
        try {
            if (this.client != null && this.client.connected) {
                this.client.end()
                logger.debug("Disconnected from the broker")
            } else {
                logger.debug("Had already disconnected from the broker")
            }
        } catch (error) {
            logger.error("Couldn't disconnect from the broker, connection closed forcibly")
        }
        this.client = null
    }

    closeClientAndExit() {
        this.end()
        process.exit()
    }
}

const version = "1.0"

module.exports = {
    "AbstractHost": AbstractHost,
    "version": version
}
