const chai = require("chai")
const assert = chai.assert
const expect = chai.expect

const RegisterRequestData = require("../../../../src/models/protocol/data/request.register")
const Device = require("../../../../src/models/protocol/entities/device")

describe("Model 'RegisterRequestData'", () => {
    describe("Parsing dictionary to object successfully", () => {
        it("should get value(s) from dictionary and create object", () => {
            const data = { "version": "1.0", "hw_id": "SN1", "name": "DEVICE", "sensors": [] }
            const model = RegisterRequestData.parse(data)
            assert.instanceOf(model, RegisterRequestData)
            assert.equal(model.version, data["version"])
            assert.instanceOf(model.device, Device)
        })
    })

    describe("Parsing dictionary to object unsuccessfully", () => {
        it("should not get value(s) from dictionary and create object", () => {
            const data = {}
            expect(() => RegisterRequestData.parse(data)).to.throw()
        })
    })

    describe("Parsing object to dictionary successfully", () => {
        it("should get value(s) from object and create dictionary", () => {
            const model = new RegisterRequestData("1.0", new Device("SN1", "DEVICE", []))
            const data = model.properties()
            assert.typeOf(data, "object")
            assert.equal(data["version"], model.version)
            assert.equal(data["hw_id"], model.device.id)
            assert.equal(data["name"], model.device.name)
            assert.typeOf(data["sensors"], "array")
            assert.equal(data["sensors"].length, 0)
        })
    })
})
