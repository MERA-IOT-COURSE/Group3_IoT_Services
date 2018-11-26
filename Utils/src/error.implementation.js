const CustomError = require("./error.custom")

class NotImplementedError extends CustomError {
    constructor(message = undefined) {
        super(message)
    }
}

class AbstractNotImplementedError extends NotImplementedError {
    constructor() {
        super()
        var classAndFunctionNames = AbstractNotImplementedError.getClassAndFunctionNames(this)
        this.message = `The abstract method is not implemented but required: ${classAndFunctionNames}`
    }

    static getClassAndFunctionNames(error) {
        return error.stack.match(/at (\S+)/g)[0].slice(3)
    }
}

class StaticNotImplementedError extends NotImplementedError {
    constructor(className) {
        super()
        var classAndFunctionNames = StaticNotImplementedError.getClassAndStaticFunctionNames(this, className)
        this.message = `The static method is not implemented but required: ${classAndFunctionNames}`
    }

    static getClassAndStaticFunctionNames(error, className) {
        return getClassAndFunctionNames(error).replace(/Function\./, `${className}.`)
    }
}

module.exports = {
    "AbstractNotImplementedError": AbstractNotImplementedError,
    "StaticNotImplementedError": StaticNotImplementedError
}
