const MQTT = require("mqtt")

const models = require("models")
const Message = models.objects.Message

const utils = require("utils")
const AbstractNotImplementedError = utils.errors.AbstractNotImplementedError
const logs = utils.logs

class AbstractHost {
    static closeClientAndCreateError(client, error) {
        if (client != null && client.connected) {
            client.end()
        }
        return error
    }

    constructor(unit, broker) {
        this.unit = unit
        this.broker = broker
        this.client = null
    }

    init() {
        logs.debug(this.unit, "Begin to setup host")
        logs.trace(this.unit, `Connecting to the broker: ${JSON.stringify(this.broker)}`)
        this.client = MQTT.connect(`mqtt://${this.broker.host}:${this.broker.port}`)
        this.client.on("connect", () => {
            logs.trace(this.unit, "Connected to the broker")
            this.prepare()
            logs.debug(this.unit, "Host is prepared")
        })
    }

    prepare() {
        throw AbstractHost.closeClientAndCreateError(this.client, new AbstractNotImplementedError())
    }

    getMessage(topic, messageData) {
        var data = JSON.parse(messageData.toString())
        var message = Message.parse(data)
        this.topicsListener(topic, message)
    }

    topicsListener(topic, message) {
        throw AbstractHost.closeClientAndCreateError(this.client, new AbstractNotImplementedError())
    }

    subscribe(topic) {
        this.client.subscribe(topic)
        logs.debug(this.unit, `Subscribed on: '${topic}'`)
    }

    handleMessage(exchangeInstance, topic, data, callback) {
        logs.trace(this.unit, `The message was got ('${exchangeInstance.message()}' <- '${topic}'):\n - ${JSON.stringify(data.properties())}`)
        callback()
        logs.trace(this.unit, `The message was handled ('${exchangeInstance.message()}' <- '${topic}')`)
    }

    handleMessageWithResult(exchangeInstance, topic, data, callback) {
        logs.trace(this.unit, `The message was got ('${exchangeInstance.message()}' <- '${topic}'):\n - ${JSON.stringify(data.properties())}`)
        var result = callback()
        logs.trace(this.unit, `The message was handled ('${exchangeInstance.message()}' <- '${topic}')`)
        return result
    }

    sendMessage(exchangeInstance, topic, data) {
        logs.trace(this.unit, `Sending the message ('${exchangeInstance.message()}' -> '${topic}'):\n - ${JSON.stringify(data.properties())}`)
        this.client.publish(topic, new exchangeInstance(data).create())
        logs.trace(this.unit, `The message was sent ('${exchangeInstance.message()}' -> '${topic}')`)
    }

    end() {
        logs.trace(this.unit, "Disconnecting from the broker")
        if (this.client != null && this.client.connected) {
            this.client.end()
            logs.trace(this.unit, "Disconnected from the broker")
        } else {
            logs.trace(this.unit, "Had already disconnected from the broker")
        }
    }
}

const version = "1.0"

module.exports = {
    "AbstractHost": AbstractHost,
    "version": version
}
