const Broker = require("./src/communication/broker")
const Device = require("./src/models/device").Device
const Sensor = require("./src/models/device").Sensor
const AbstractServer = require("./src/communication/hosts").AbstractServer
const AbstractDevice = require("./src/communication/hosts").AbstractDevice

var broker = new Broker({
    host: "localhost",
    port: 1883
})

var device = new Device("1", "Single", [new Sensor("1.1", "led.one_color")])

class Server extends AbstractServer {
    initializeDevice(data) {
        console.log(`INIT SUCCESS: ${JSON.stringify(data)}`)
        return "OK"
    }

    handleSensorDataResponse(deviceId, data) {
        console.log(`SENSOR_DATA RESPONSE FROM ${deviceId}: ${JSON.stringify(data)}`)
    }

    handleDeviceActionResponse(data) {
        console.log(`RESP_DEVICE_ACTION RESPONSE: ${JSON.stringify(data)}`)
    }

    handleSensorActionResponse(data) {
        console.log(`RESP_SENSOR_ACTION RESPONSE: ${JSON.stringify(data)}`)
    }
}

class SingleDevice extends AbstractDevice {
    handleDeviceActionRequest(deviceActionId) {
        console.log(`REQ_DEVICE_ACTION WITH ACTION: ${deviceActionId}`)
        return { status: "0", data: "device: a lot of info" }
    }

    handleSensorActionRequest(sensorActionId, sensorId) {
        console.log(`REQ_SENSOR_ACTION FOR ${sensorId} WITH ACTION: ${sensorActionId}`)
        return { status: "0", data: "sensor: a lot of info" }
    }
}

if (process.argv[2] === "s") {
    new Server(broker, "xromash").init()
} else if (process.argv[2] === "d") {
    new SingleDevice(broker, "xromash", device).init()
}