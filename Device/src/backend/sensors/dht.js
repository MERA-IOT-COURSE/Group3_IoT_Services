var RpiDhtSensor = require("rpi-dht-sensor")

const Sensor = require("./sensor")

class DHT extends Sensor {
    initialize(sensorData, protocol) {
        this.dht = new RpiDhtSensor.DHT11(22)
    }

    value() {
        var res = this.dht.read()
        return {
            "Temperature": res.temperature.toFixed(2),
            "Humidity": res.humidity.toFixed(2)
        }
    }
}

module.exports = DHT
