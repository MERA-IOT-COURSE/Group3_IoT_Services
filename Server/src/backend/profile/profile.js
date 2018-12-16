module.exports = (database) => {
    return new database.Schema({
        backendId: { type: String, default: "group3-be" },
        broker: {
            host: { type: String, default: "localhost" },
            port: { type: Number, default: 1883 }
        },
        active: { type: Boolean, default: true }
    })
}
