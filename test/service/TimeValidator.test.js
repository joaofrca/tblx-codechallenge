const TimeValidator = require('../../src/service/validators/TimeValidator');
const chai = require('chai');
const { expect } = chai;

describe('Test TimeValidator: ', () => {
    it('-> validateStartIsBeforeEnd', (done) => {
        const starttime = "2012-10-31T00:00:01";
        const endtime = "2012-10-30T00:14:43";
        const errorMessage = "StartTime cannot be bigger or equal than EndTime."
        expect(() => TimeValidator.validateStartIsBeforeEnd(starttime, endtime))
            .to.throw(errorMessage);
        done();
    });

    it('-> validateTimeRegex', (done) => {
        const starttime = "2012-10-31T00:00:WRONG";
        const endtime = "2012-10-30T00:14:WRONG";
        const errorMessage = "Time should be in ISO 8601 format: YYYY-MM-DDThh:mm:ss"
        expect(() => TimeValidator.validateStartAndEndData(starttime, endtime))
            .to.throw(errorMessage);
        done();
    });

    it('-> validateNullOrEmpty', (done) => {
        const starttime = "";
        const endtime = "";
        const errorMessage = "Data cannot be null."
        expect(() => TimeValidator.validateStartAndEndData(starttime, endtime))
            .to.throw(errorMessage);
        done();
    });
});