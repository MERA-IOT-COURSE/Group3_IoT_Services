const chai = require("chai")
const assert = chai.assert
const expect = chai.expect

const ActionSensorResponseData = require("../../../../src/models/protocol/data/response.action.sensor")

describe("Model 'ActionSensorResponseData'", () => {
    describe("Parsing dictionary to object successfully", () => {
        it("should get value(s) from dictionary and create object (w/o 'data' value)", () => {
            const data = { "id": "ID1", "sensor_id": "SENSORID1", "status": "STATUS" }
            const model = ActionSensorResponseData.parse(data)
            assert.instanceOf(model, ActionSensorResponseData)
            assert.equal(model.id, data["id"])
            assert.equal(model.sensorId, data["sensor_id"])
            assert.equal(model.status, data["status"])
            expect(model.data).to.be.null
        })
    })

    describe("Parsing dictionary to object successfully", () => {
        it("should get value(s) from dictionary and create object (w/ 'data' value)", () => {
            const data = { "id": "ID1", "sensor_id": "SENSORID1", "status": "STATUS", "data": "SOME DATA" }
            const model = ActionSensorResponseData.parse(data)
            assert.instanceOf(model, ActionSensorResponseData)
            assert.equal(model.id, data["id"])
            assert.equal(model.sensorId, data["sensor_id"])
            assert.equal(model.status, data["status"])
            assert.equal(model.data, data["data"])
        })
    })

    describe("Parsing dictionary to object unsuccessfully", () => {
        it("should not get value(s) from dictionary and create object", () => {
            const data = {}
            const model = ActionSensorResponseData.parse(data)
            assert.instanceOf(model, ActionSensorResponseData)
            expect(model.id).to.be.undefined
            expect(model.sensorId).to.be.undefined
            expect(model.status).to.be.undefined
            expect(model.data).to.be.null
        })
    })

    describe("Parsing object to dictionary successfully", () => {
        it("should get value(s) from object and create dictionary (w/o 'data' value)", () => {
            const model = new ActionSensorResponseData("ID1", "SENSORID1", "STATUS")
            const data = model.properties()
            assert.typeOf(data, "object")
            assert.equal(data["id"], model.id)
            assert.equal(data["sensor_id"], model.sensorId)
            assert.equal(data["status"], model.status)
        })
    })

    describe("Parsing object to dictionary successfully", () => {
        it("should get value(s) from object and create dictionary (w/ 'data' value)", () => {
            const model = new ActionSensorResponseData("ID1", "SENSORID1", "STATUS", "SOME DATA")
            const data = model.properties()
            assert.typeOf(data, "object")
            assert.equal(data["id"], model.id)
            assert.equal(data["sensor_id"], model.sensorId)
            assert.equal(data["status"], model.status)
            assert.equal(data["data"], model.data)
        })
    })
})
