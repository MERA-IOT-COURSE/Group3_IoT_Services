const chai = require("chai")
const assert = chai.assert
const expect = chai.expect

const RegisterResponseData = require("../../../../src/models/protocol/data/response.register")

describe("Model 'RegisterResponseData'", () => {
    describe("Parsing dictionary to object successfully", () => {
        it("should get value(s) from dictionary and create object (w/o 'registration_delay' value)", () => {
            const data = { "status": "STATUS" }
            const model = RegisterResponseData.parse(data)
            assert.instanceOf(model, RegisterResponseData)
            assert.equal(model.status, data["status"])
            assert.equal(model.delay, 0)
        })
    })

    describe("Parsing dictionary to object successfully", () => {
        it("should get value(s) from dictionary and create object (w/ 'registration_delay' value)", () => {
            const data = { "status": "STATUS", "registration_delay": 1 }
            const model = RegisterResponseData.parse(data)
            assert.instanceOf(model, RegisterResponseData)
            assert.equal(model.status, data["status"])
            assert.equal(model.delay, data["registration_delay"])
        })
    })

    describe("Parsing dictionary to object unsuccessfully", () => {
        it("should not get value(s) from dictionary and create object", () => {
            const data = {}
            const model = RegisterResponseData.parse(data)
            assert.instanceOf(model, RegisterResponseData)
            expect(model.status).to.be.undefined
            assert.equal(model.delay, 0)
        })
    })

    describe("Parsing object to dictionary successfully", () => {
        it("should get value(s) from object and create dictionary (w/o 'registration_delay' value)", () => {
            const model = new RegisterResponseData("STATUS")
            const data = model.properties()
            assert.typeOf(data, "object")
            assert.equal(data["status"], model.status)
        })
    })

    describe("Parsing object to dictionary successfully", () => {
        it("should get value(s) from object and create dictionary (w/ 'registration_delay' value)", () => {
            const model = new RegisterResponseData("STATUS", 1)
            const data = model.properties()
            assert.typeOf(data, "object")
            assert.equal(data["status"], model.status)
            assert.equal(data["registration_delay"], model.delay)
        })
    })
})
