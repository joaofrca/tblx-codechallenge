const OperatorValidator = require('../../src/service/validators/OperatorValidator');
const chai = require('chai');
const { expect } = chai;

describe('Test OperatorValidator: ', () => {
    it('-> validateOperatorLength', (done) => {
        const operator = "ABC";
        const errorMessage = "Operator length must be 2 characters long."
        expect(() => OperatorValidator.validateOperatorData(operator))
            .to.throw(errorMessage);
        done();
    });

    it('-> validateNullOrEmpty', (done) => {
        const operator = "";
        const errorMessage = "Data cannot be null."
        expect(() => OperatorValidator.validateOperatorData(operator))
            .to.throw(errorMessage);
        done();
    });
});