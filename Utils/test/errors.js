const expect = require("chai").expect
const notImplementedErrors = require("../src/errors/implementation")

var abstractMethodError = null
var staticMethodError = null

class ClassWithAbstractMethod {
    method() {
        abstractMethodError = new notImplementedErrors.AbstractNotImplementedError()
        throw abstractMethodError
    }
}

class ClassWithImplementedAbstractMethod extends ClassWithAbstractMethod {
    method() {
        return 0
    }
}

class ClassWithStaticMethod {
    static method() {
        staticMethodError = new notImplementedErrors.StaticNotImplementedError(this.name)
        throw staticMethodError
    }
}

class ClassWithImplementedStaticMethod extends ClassWithStaticMethod {
    static method() {
        return 0
    }
}

describe("Not implemented errors", function () {
    describe("Abstract method is thrown exception", function () {
        it("should throw AbstractNotImplementedError exception when abstract method is not implemented", function () {
            const object = new ClassWithAbstractMethod()
            expect(() => object.method()).to.throw(abstractMethodError)
            const expectedClassAndFunctionNames = `${ClassWithAbstractMethod.name}.${object.method.name}`
            expect(abstractMethodError.classAndFunctionNames).to.equal(expectedClassAndFunctionNames)
        });
    });
    
    describe("Abstract method is not thrown exception", function () {
        it("should not throw AbstractNotImplementedError exception when abstract method is implemented", function () {
            expect(new ClassWithImplementedAbstractMethod().method()).to.equal(0)
        });
    });
    
    describe("Static method is thrown exception", function () {
        it("should throw StaticNotImplementedError exception when static method is not implemented", function () {
            expect(() => ClassWithStaticMethod.method()).to.throw(staticMethodError)
            const expectedClassAndFunctionNames = `${ClassWithStaticMethod.name}.${ClassWithStaticMethod.method.name}`
            expect(staticMethodError.classAndFunctionNames).to.equal(expectedClassAndFunctionNames)
        });
    });

    describe("Static method is not thrown exception", function () {
        it("should not throw StaticNotImplementedError exception when static method is implemented", function () {
            expect(ClassWithImplementedStaticMethod.method()).to.equal(0)
        });
    });
});
