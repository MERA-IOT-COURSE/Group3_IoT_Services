const AbstractRequests = require("utils").web.AbstractRequests

class Requests extends AbstractRequests {
    get(app) {
        app.get("/", (req, res) => {
            res.render("main")
        })
    }
}

module.exports = Requests
