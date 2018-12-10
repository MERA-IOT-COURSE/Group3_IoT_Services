const common = require("common")
const ActionDeviceResponseData = common.models.protocol.data.ActionDeviceResponseData
const ActionSensorResponseData = common.models.protocol.data.ActionSensorResponseData
const AbstractDevice = common.utils.protocol.AbstractDevice
const logger = common.utils.logging.logger

class ProtocolDevice extends AbstractDevice {
    handleRegisterResponse(registerResponseData) {
        if (registerResponseData.status === "OK") {
            logger.info(`Initialization of '${this.device.id}' device is completed successfully`)
        } else {
            logger.error(`Initialization of '${this.device.id}' device is completed unsuccessfully`)
        }
    }

    handleActionDeviceRequest(actionDeviceRequestData) {
        logger.info(`Handle action request for '${this.device.id}' device`)
        return new ActionDeviceResponseData(actionDeviceRequestData.id, "device: a lot of info")
    }

    handleActionSensorRequest(actionSensorRequestData) {
        logger.info(`Handle action request for '${this.device.id}' device's sensor`)
        return new ActionSensorResponseData(actionSensorRequestData.id, actionSensorRequestData.sensorId, "sensor: a lot of info")
    }
}

module.exports = ProtocolDevice