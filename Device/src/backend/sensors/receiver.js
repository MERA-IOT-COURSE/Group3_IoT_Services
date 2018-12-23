const lirc = require("lirc-client")({
    path: "/var/run/lirc/lircd"
})

const common = require("common")
const SensorData = common.models.protocol.data.SensorData
const logger = common.utils.logging.logger

const Sensor = require("./sensor")

const ButtonsEnum = {
    "carmp3_last": [
        "CHANNEL_MINUS", "CHANNEL", "CHANNEL_PLUS",
        "PREVIOUS", "NEXT", "PLAY_PAUSE",
        "VOLUME_MINUS", "VOLUME_PLUS", "EQUALIZER",
        "KEY_ZERO", "ONE_HUNDRED_PLUS", "TWO_HUNDRED_PLUS",
        "KEY_ONE", "KEY_TWO", "KEY_THREE",
        "KEY_FOUR", "KEY_FIVE", "KEY_SIX",
        "KEY_SEVEN", "KEY_EIGHT", "KEY_NINE"
    ]
}

function checkSupporting(remote, type) {
    if (ButtonsEnum.hasOwnProperty(remote)) {
        for (var i = 0; i < ButtonsEnum[remote].length; i++) {
            if (type === ButtonsEnum[remote][i]) {
                logger.info(`Received button is known: ${remote} -> ${type}`)
                return true
            }
        }
    } else {
        logger.error(`Remote controller is unknown: ${remote} -> ${type}`)
        return false
    }
    logger.error(`Received button is unknown: ${remote} -> ${type}`)
    return false
}

const connectLogger = () => logger.info("LIRC is connected")
function buttonReceiver(sensorData, protocol) {
    return (remote, type, repeat) => {
        if (checkSupporting(remote, type)) {
            var data = new SensorData(sensorData.id, `RC: ${remote}, B: ${type}`)
            protocol.sendSensorDataResponse(data)
        }
    }
}

class Receiver extends Sensor {
    initialize(sensorData, protocol) {
        this.connectLogger = connectLogger
        this.buttonReceiver = buttonReceiver(sensorData, protocol)

        lirc.on("connect", this.connectLogger)
        lirc.on("receive", this.buttonReceiver)
    }

    deinitialize() {
        lirc.removeListener("connect", this.connectLogger)
        lirc.removeListener("receive", this.buttonReceiver)
    }
}

module.exports = Receiver