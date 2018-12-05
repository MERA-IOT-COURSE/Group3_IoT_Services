const models = require("models")

const Device = models.objects.Device
const Sensor = models.objects.Sensor
const Broker = models.objects.Broker

const RegisterResponseData = models.data.RegisterResponseData
const ActionDeviceResponseData = models.data.ActionDeviceResponseData
const ActionSensorResponseData = models.data.ActionSensorResponseData
const SensorData = models.data.SensorData

const AbstractServer = require("./src/communication/server")
const AbstractDevice = require("./src/communication/device")

const utils = require("utils")
const logger = utils.logs.logger

var broker = new Broker({
    host: "localhost",
    port: 1883
})

var device = new Device("1", "Single", [new Sensor("1.1", "led.one_color")])

class Server extends AbstractServer {
    handleRegisterRequest(deviceId, registerRequestData) {
        logger.info(`Handle register response for '${deviceId}' device`)
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

class SingleDevice extends AbstractDevice {
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

if (process.argv[2] === "s") {
    var server = new Server(broker, "xromash")
    server.init()
    return server
} else if (process.argv[2] === "d") {
    var single = new SingleDevice(broker, "xromash", device)
    single.init()
    setTimeout(function () { single.sendSensorDataResponse(new SensorData("1.1", 45)) }, 1000)
    setTimeout(function () { single.sendSensorDataResponse(new SensorData("1.1", 63, new Date())) }, 2000)
    return single
}
