const chai = require("chai")
const assert = chai.assert
const expect = chai.expect

const Device = require("../../../../src/models/protocol/entities/device")

describe("Model 'Device'", () => {
    describe("Parsing dictionary to object successfully", () => {
        it("should get value(s) from dictionary and create object", () => {
            const data = { "hw_id": "SN1", "name": "DEVICE", "sensors": [] }
            const model = Device.parse(data)
            assert.instanceOf(model, Device)
            assert.equal(model.id, data["hw_id"])
            assert.equal(model.name, data["name"])
            assert.typeOf(model.sensors, "array")
            assert.typeOf(model.actions, "array")
        })
    })

    describe("Parsing dictionary to object unsuccessfully", () => {
        it("should not get value(s) from dictionary and create object", () => {
            const data = {}
            const model = Device.parse(data)
            assert.instanceOf(model, Device)
            expect(model.id).to.be.undefined
            expect(model.name).to.be.undefined
            assert.typeOf(model.sensors, "array")
            assert.equal(model.sensors.length, 0)
            assert.typeOf(model.actions, "array")
            assert.equal(model.actions.length, 0)
        })
    })

    describe("Parsing object to dictionary successfully", () => {
        it("should get value(s) from object and create dictionary", () => {
            const model = new Device("SN1", "DEVICE", [])
            const data = model.properties()
            assert.typeOf(data, "object")
            assert.equal(data["hw_id"], model.id)
            assert.equal(data["name"], model.name)
            assert.typeOf(model.sensors, "array")
            assert.equal(model.sensors.length, 0)
        })
    })
})
