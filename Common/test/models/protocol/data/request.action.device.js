const chai = require("chai")
const assert = chai.assert
const expect = chai.expect

const ActionDeviceRequestData = require("../../../../src/models/protocol/data/request.action.device")

describe("Model 'ActionDeviceRequestData'", () => {
    describe("Parsing dictionary to object successfully", () => {
        it("should get value(s) from dictionary and create object", () => {
            const data = { "id": "ID1" }
            const model = ActionDeviceRequestData.parse(data)
            assert.instanceOf(model, ActionDeviceRequestData)
            assert.equal(model.id, data["id"])
        })
    })

    describe("Parsing dictionary to object unsuccessfully", () => {
        it("should not get value(s) from dictionary and create object", () => {
            const data = {}
            const model = ActionDeviceRequestData.parse(data)
            assert.instanceOf(model, ActionDeviceRequestData)
            expect(model.id).to.be.undefined
        })
    })

    describe("Parsing object to dictionary successfully", () => {
        it("should get value(s) from object and create dictionary", () => {
            const model = new ActionDeviceRequestData("ID1")
            const data = model.properties()
            assert.typeOf(data, "object")
            assert.equal(data["id"], model.id)
        })
    })
})
