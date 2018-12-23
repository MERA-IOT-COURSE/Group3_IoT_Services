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

class Receiver extends Sensor {
    constructor(sensorData, protocol) {
        super(sensorData, protocol)
    }

    initialize() {
        lirc.on("connect", () => logger.info("LIRC is connected"))
        lirc.on("receive", function (remote, type, repeat) {
            if (checkSupporting(remote, type)) {
                var sensorData = new SensorData(this.sensorData.id, `RC: ${remote}, B: ${type}`)
                this.protocol.sendSensorDataResponse(sensorData)
            }
        })
    }

    deinitialize() {
        lirc.disconnect().then(() => {
            logger.info("LIRC is disconnected")
        }).catch(err => {
            logger.error(err)
        })
    }
}

module.exports = Receiver