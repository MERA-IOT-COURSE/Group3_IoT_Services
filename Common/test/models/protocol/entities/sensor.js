const chai = require("chai")
const assert = chai.assert
const expect = chai.expect

const Sensor = require("../../../../src/models/protocol/entities/sensor")

describe("Model 'Sensor'", () => {
    describe("Parsing dictionary to object successfully", () => {
        it("should get value(s) from dictionary and create object", () => {
            const data = { "id": "SN1", "type": "TYPE" }
            const model = Sensor.parse(data)
            assert.instanceOf(model, Sensor)
            assert.equal(model.id, data["id"])
            assert.equal(model.type, data["type"])
            assert.typeOf(model.actions, "array")
        })
    })

    describe("Parsing dictionary to object unsuccessfully", () => {
        it("should not get value(s) from dictionary and create object", () => {
            const data = {}
            const model = Sensor.parse(data)
            assert.instanceOf(model, Sensor)
            expect(model.id).to.be.undefined
            expect(model.type).to.be.undefined
            assert.typeOf(model.actions, "array")
        })
    })

    describe("Parsing object to dictionary successfully", () => {
        it("should get value(s) from object and create dictionary", () => {
            const model = new Sensor("SN1", "TYPE")
            const data = model.properties()
            assert.typeOf(data, "object")
            assert.equal(data["id"], model.id)
            assert.equal(data["type"], model.type)
        })
    })
})
