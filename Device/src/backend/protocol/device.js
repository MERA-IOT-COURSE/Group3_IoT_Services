const childProcess = require("child_process")

const common = require("common")
const ActionDeviceResponseData = common.models.protocol.data.ActionDeviceResponseData
const ActionSensorResponseData = common.models.protocol.data.ActionSensorResponseData
const AbstractDevice = common.utils.protocol.AbstractDevice
const logger = common.utils.logging.logger

const Receiver = require("../sensors/receiver")

class ProtocolDevice extends AbstractDevice {
    initializeSensors(profile) {
        if (this.sensors != null || this.sensors != undefined) {
            for (var i = 0; i < this.sensors.length; i++) {
                this.sensors[i].deinitialize()
            }
        }
        this.sensors = {}
        profile.device.sensors.map(sensor => {
            if (sensor.type === "sensor.receiver") {
                var receiver = new Receiver(sensor, this)
                receiver.initialize()
                this.sensors[sensor.id] = receiver
            }
        })
    }

    handleRegisterResponse(registerResponseData) {
        if (registerResponseData.status === "OK") {
            logger.info(`Initialization of '${this.profile.device.id}' device is completed successfully`)
        } else {
            logger.error(`Initialization of '${this.profile.device.id}' device is completed unsuccessfully`)
        }
    }

    handleActionDeviceRequest(actionDeviceRequestData) {
        logger.info(`Handle action request for '${this.profile.device.id}' device`)
        try {
            var res = null
            switch (actionDeviceRequestData.id) {
                case "custom.uname":
                    res = childProcess.execSync("uname", { cwd: __dirname, env: childProcess.env, stdio: "inherit" }).toString("utf8")
                    break
            }
            return new ActionDeviceResponseData(actionDeviceRequestData.id, res ? "OK" : "Unknown action", res)
        } catch (err) {
            return new ActionDeviceResponseData(actionDeviceRequestData.id, "Internal server error", err)
        }
    }

    handleActionSensorRequest(actionSensorRequestData) {
        logger.info(`Handle action request for '${this.profile.device.id}:${actionSensorRequestData.sensorId}' device's sensor`)
        try {
            var res = null
            switch (actionSensorRequestData.id) {
                case "common.read":
                    res = this.sensors[actionSensorRequestData.sensorId].value()
                    break
            }
            return new ActionSensorResponseData(actionSensorRequestData.id, actionSensorRequestData.sensorId, res ? "OK" : "Unknown action", res)
        } catch (err) {
            return new ActionSensorResponseData(actionSensorRequestData.id, actionSensorRequestData.sensorId, "Internal server error", err)
        }
    }
}

module.exports = ProtocolDevice