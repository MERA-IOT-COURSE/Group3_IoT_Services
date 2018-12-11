const chai = require("chai")
const assert = chai.assert
const expect = chai.expect

const Action = require("../../../../src/models/protocol/entities/action")

describe("Model 'Action'", () => {
    describe("Parsing dictionary to object successfully", () => {
        it("should get value(s) from dictionary and create object", () => {
            const data = { "id": "ID1", "name": "ACTION" }
            const model = Action.parse(data)
            assert.instanceOf(model, Action)
            assert.equal(model.id, data["id"])
            assert.equal(model.name, data["name"])
        })
    })

    describe("Parsing dictionary to object unsuccessfully", () => {
        it("should not get value(s) from dictionary and create object", () => {
            const data = {}
            const model = Action.parse(data)
            assert.instanceOf(model, Action)
            expect(model.id).to.be.undefined
            expect(model.name).to.be.undefined
        })
    })

    describe("Parsing object to dictionary successfully", () => {
        it("should get value(s) from object and create dictionary", () => {
            const model = new Action("ID1", "ACTION")
            const data = model.properties()
            assert.typeOf(data, "object")
            assert.equal(data["id"], model.id)
            assert.equal(data["name"], model.name)
        })
    })
})
