const chai = require("chai")
const assert = chai.assert
const expect = chai.expect

const SensorData = require("../../../../src/models/protocol/data/response.sensor")

describe("Model 'SensorData'", () => {
    describe("Parsing dictionary to object successfully", () => {
        it("should get value(s) from dictionary and create object (w/o 'ts' value)", () => {
            const data = { "sensor_id": "SENSORID1", "value": "100" }
            const model = SensorData.parse(data)
            assert.instanceOf(model, SensorData)
            assert.equal(model.sensorId, data["sensor_id"])
            assert.equal(model.value, data["value"])
            expect(model.ts).to.be.null
        })
    })

    describe("Parsing dictionary to object successfully", () => {
        it("should get value(s) from dictionary and create object (w/ 'ts' value)", () => {
            const data = { "sensor_id": "SENSORID1", "value": "100", "ts": "1" }
            const model = SensorData.parse(data)
            assert.instanceOf(model, SensorData)
            assert.equal(model.sensorId, data["sensor_id"])
            assert.equal(model.value, data["value"])
            assert.equal(model.ts, data["ts"])
        })
    })

    describe("Parsing dictionary to object unsuccessfully", () => {
        it("should not get value(s) from dictionary and create object", () => {
            const data = {}
            const model = SensorData.parse(data)
            assert.instanceOf(model, SensorData)
            expect(model.sensorId).to.be.undefined
            expect(model.value).to.be.undefined
            expect(model.ts).to.be.null
        })
    })

    describe("Parsing object to dictionary successfully", () => {
        it("should get value(s) from object and create dictionary (w/o 'ts' value)", () => {
            const model = new SensorData("SENSORID1", "100")
            const data = model.properties()
            assert.typeOf(data, "object")
            assert.equal(data["sensor_id"], model.sensorId)
            assert.equal(data["value"], model.value)
        })
    })

    describe("Parsing object to dictionary successfully", () => {
        it("should get value(s) from object and create dictionary (w/ 'ts' value)", () => {
            const model = new SensorData("SENSORID1", "100", "1")
            const data = model.properties()
            assert.typeOf(data, "object")
            assert.equal(data["sensor_id"], model.sensorId)
            assert.equal(data["value"], model.value)
            assert.equal(data["ts"], model.ts)
        })
    })
})
