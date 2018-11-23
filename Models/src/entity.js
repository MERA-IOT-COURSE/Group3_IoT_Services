class Entity {
    static parse(data) {
        throw new Error("Entity: the implementation of \"parse\" static method is required")
    }

    properties() {
        throw new Error("Entity: the implementation of \"properties\" method is required")
    }
}

module.exports = Entity
