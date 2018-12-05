const CustomError = require("./custom")

class NotImplementedError extends CustomError {
    constructor(message = undefined) {
        super(message)
    }

    static getClassAndFunctionNames(error) {
        return error.stack.match(/at (\S+)/g)[0].slice(3)
    }
}

class AbstractNotImplementedError extends NotImplementedError {
    constructor() {
        super()
        this.classAndFunctionNames = AbstractNotImplementedError.getClassAndFunctionNames(this)
        this.message = `The abstract method is not implemented but required: ${this.classAndFunctionNames}`
    }
}

class StaticNotImplementedError extends NotImplementedError {
    constructor(className) {
        super()
        this.classAndFunctionNames = StaticNotImplementedError.getClassAndStaticFunctionNames(this, className)
        this.message = `The static method is not implemented but required: ${this.classAndFunctionNames}`
    }

    static getClassAndStaticFunctionNames(error, className) {
        return StaticNotImplementedError.getClassAndFunctionNames(error).replace(/Function\./, `${className}.`)
    }
}

module.exports = {
    "AbstractNotImplementedError": AbstractNotImplementedError,
    "StaticNotImplementedError": StaticNotImplementedError
}
