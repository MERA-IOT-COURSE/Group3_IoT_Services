const Entity = require("../entity")

class Action extends Entity {
    static parse(data) {
        var id = data["id"]
        var name = data["name"]
        return new Action(id, name)
    }

    constructor(id, name) {
        super()
        this.id = id
        this.name = name
    }

    properties() {
        return {
            "id": this.id,
            "name": this.name
        }
    }
}

module.exports = Action
