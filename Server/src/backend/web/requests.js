function mainPage(app) {
    app.get("/", (req, res) => {
        res.render("main")
    })
}

class Requests {
    constructor() {
        this.requests = [mainPage]
    }

    all(app) {
        this.requests.forEach(func => {
            func(app)
        })
    }
}

module.exports = new Requests()
