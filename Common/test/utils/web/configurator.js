const chai = require("chai")
chai.use(require("chai-http"))
const expect = chai.expect
const assert = chai.assert

const AbstractRequests = require("../../../src/models/containers/requests")
const Server = require("../../../src/models/containers/server")
const ServerConfigurator = require("../../../src/utils/web/configurator")

const getResult = "Getting 'Hello, World!'"
const postResult = "Posting 'Hello, World!'"
const putResult = "Putting 'Hello, World!'"
const deleteResult = "Deleting 'Hello, World!'"

class Requests extends AbstractRequests {
    get(app) {
        app.get("/", (req, res) => {
            res.send(getResult)
        })
    }

    post(app) {
        app.post("/", (req, res) => {
            res.send(postResult)
        })
    }

    put(app) {
        app.put("/", (req, res) => {
            res.send(putResult)
        })
    }

    delete(app) {
        app.delete("/", (req, res) => {
            res.send(deleteResult)
        })
    }
}

const server = new Server({
    static: "./",
    requests: new Requests()
})

const web = new ServerConfigurator(server).setup()

describe("Web server configuration", () => {
    before(() => {
        web.launch()
    })

    describe("GET /", () => {
        it("should perform request sucessfully", () => {
            chai.request(web.app).get("/").end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                assert.equal(res.text, getResult)
            })
        })
    })

    describe("POST /", () => {
        it("should perform request sucessfully", () => {
            chai.request(web.app).post("/").end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                assert.equal(res.text, postResult)
            })
        })
    })

    describe("PUT /", () => {
        it("should perform request sucessfully", () => {
            chai.request(web.app).put("/").end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                assert.equal(res.text, putResult)
            })
        })
    })

    describe("DELETE /", () => {
        it("should perform request sucessfully", () => {
            chai.request(web.app).delete("/").end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                assert.equal(res.text, deleteResult)
            })
        })
    })

    after(() => {
        web.stop()
    })
})
