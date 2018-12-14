class MongoDB {
    constructor(options = {}) {
        this.host = options["host"] || "localhost"
        this.port = options["port"] || 27017
        this.schema = options["schema"] || "iot"
        this.user = options["user"]
        this.password = options["password"]
    }

    getURIString() {
        return `mongodb://${this.host}:${this.port}/`
    }

    getOptions() {
        var options = {
            useNewUrlParser: true,
            dbName: this.schema
        }
        if (this.user !== "" && this.user !== null && this.user !== undefined &&
            this.password !== "" && this.password !== null && this.password !== undefined) {
            options["user"] = this.user
            options["pass"] = this.password
        }
        return options
    }
}

module.exports = MongoDB