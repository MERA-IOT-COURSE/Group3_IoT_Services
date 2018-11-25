class CustomError extends Error {
    constructor(message = undefined) {
        super(message)
    }
}

module.exports = CustomError
