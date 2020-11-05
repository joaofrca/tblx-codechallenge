const VehicleIDValidator = require('../../src/service/validators/VehicleIDValidator');
const chai = require('chai');
const { expect } = chai;

describe('Test VehicleIDValidator: ', () => {
    it('-> validateOperatorLength', (done) => {
        const vehicleID = "123456";
        const errorMessage = "VehicleID length must be 5 characters long."
        expect(() => VehicleIDValidator.validateVehicleIDData(vehicleID))
            .to.throw(errorMessage);
        done();
    });

    it('-> validateDataType', (done) => {
        const vehicleID = {vehicleID: "n1234"};
        const errorMessage = `${vehicleID.vehicleID} must be a number.`
        expect(() => VehicleIDValidator.validateVehicleIDData(vehicleID))
            .to.throw(errorMessage);
        done();
    });

    it('-> validateNullOrEmpty', (done) => {
        const vehicleID = "";
        const errorMessage = "Data cannot be null."
        expect(() => VehicleIDValidator.validateVehicleIDData(vehicleID))
            .to.throw(errorMessage);
        done();
    });
});