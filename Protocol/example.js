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

var broker = new Broker({
    host: "localhost",
    port: 1883
})

var device = new Device("1", "Single", [new Sensor("1.1", "led.one_color")])

class Server extends AbstractServer {
    handleRegisterRequest(registerRequestData) {
        console.log(`INIT SUCCESS: ${JSON.stringify(registerRequestData.properties())}`)
        return new RegisterResponseData("OK")
    }

    handleSensorDataResponse(deviceId, sensorDataResponseData) {
        console.log(`SENSOR_DATA RESPONSE FROM '${deviceId}': ${JSON.stringify(sensorDataResponseData.properties())}`)
    }

    handleActionDeviceResponse(deviceId, deviceActionResponseData) {
        console.log(`RESP_DEVICE_ACTION RESPONSE FROM '${deviceId}': ${JSON.stringify(deviceActionResponseData.properties())}`)
    }

    handleActionSensorResponse(deviceId, sensorActionResponseData) {
        console.log(`RESP_SENSOR_ACTION RESPONSE FROM '${deviceId}': ${JSON.stringify(sensorActionResponseData.properties())}`)
    }
}

class SingleDevice extends AbstractDevice {
    handleRegisterResponse(registerResponseData) {
        if (registerResponseData.status === "OK") {
            console.log(`INIT SUCCESS`)
        } else {
            console.log(`INIT FAILED`)
        }
    }

    handleActionDeviceRequest(actionDeviceRequestData) {
        console.log(`REQ_DEVICE_ACTION WITH ACTION: ${JSON.stringify(actionDeviceRequestData.properties())}`)
        return new ActionDeviceResponseData(actionDeviceRequestData.id, "device: a lot of info")
    }

    handleActionSensorRequest(actionSensorRequestData) {
        console.log(`REQ_SENSOR_ACTION WITH ACTION: ${JSON.stringify(actionSensorRequestData.properties())}`)
        return new ActionSensorResponseData(actionSensorRequestData.id, actionSensorRequestData.sensorId, "sensor: a lot of info")
    }
}

if (process.argv[2] === "s") {
    new Server(broker, "xromash").init()
} else if (process.argv[2] === "d") {
    var single = new SingleDevice(broker, "xromash", device)
    single.init()
    setTimeout(function () { single.sendSensorDataResponse(new SensorData("1.1", 45)) }, 1000)
    setTimeout(function () { single.sendSensorDataResponse(new SensorData("1.1", 63, new Date())) }, 2000)
}
