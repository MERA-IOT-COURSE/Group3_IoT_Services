class AbstractRequests {
    get(app) {
    }

    post(app) {
    }

    put(app) {
    }

    delete(app) {
    }

    methods() {
        return [
            this.get,
            this.post,
            this.put,
            this.delete
        ]
    }
}

module.exports = AbstractRequests
