const common = require("common")
const RegisterResponseData = common.models.protocol.data.RegisterResponseData
const AbstractServer = common.utils.protocol.AbstractServer
const logger = common.utils.logging.logger

class ProtocolServer extends AbstractServer {
    constructor(messages, devices) {
        super(messages)
        this.devices = devices
    }

    handleRegisterRequest(deviceId, registerRequestData) {
        logger.info(`Handle register response for '${deviceId}' device`)
        var device = {
            id: registerRequestData.device.id,
            name: registerRequestData.device.name,
            sensors: registerRequestData.device.sensors,
            actions: registerRequestData.device.actions,
            active: true
        }
        this.devices.save(device).catch(err => {
            logger.error(err)
        })
        return new RegisterResponseData("OK")
    }

    handleSensorDataResponse(deviceId, sensorDataResponseData) {
        logger.info(`Handle sensor data from '${deviceId}' device`)
    }

    handleActionDeviceResponse(deviceId, deviceActionResponseData) {
        logger.info(`Handle action response from '${deviceId}' device`)
    }

    handleActionSensorResponse(deviceId, sensorActionResponseData) {
        logger.info(`Handle action response from '${deviceId}' device's sensor`)
    }
}

module.exports = ProtocolServer