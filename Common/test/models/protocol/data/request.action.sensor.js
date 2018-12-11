const chai = require("chai")
const assert = chai.assert
const expect = chai.expect

const ActionSensorRequestData = require("../../../../src/models/protocol/data/request.action.sensor")

describe("Model 'ActionSensorRequestData'", () => {
    describe("Parsing dictionary to object successfully", () => {
        it("should get value(s) from dictionary and create object", () => {
            const data = { "id": "ID1", "sensor_id": "SENSORID1" }
            const model = ActionSensorRequestData.parse(data)
            assert.instanceOf(model, ActionSensorRequestData)
            assert.equal(model.id, data["id"])
            assert.equal(model.sensorId, data["sensor_id"])
        })
    })

    describe("Parsing dictionary to object unsuccessfully", () => {
        it("should not get value(s) from dictionary and create object", () => {
            const data = {}
            const model = ActionSensorRequestData.parse(data)
            assert.instanceOf(model, ActionSensorRequestData)
            expect(model.id).to.be.undefined
            expect(model.sensorId).to.be.undefined
        })
    })

    describe("Parsing object to dictionary successfully", () => {
        it("should get value(s) from object and create dictionary", () => {
            const model = new ActionSensorRequestData("ID1", "SENSORID1")
            const data = model.properties()
            assert.typeOf(data, "object")
            assert.equal(data["id"], model.id)
            assert.equal(data["sensor_id"], model.sensorId)
        })
    })
})
