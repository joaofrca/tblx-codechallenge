const busgpsService = require('../../src/service/busgpsService');
const { app } = require('../../app');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;

chai.use(chaiHTTP);

describe('Test busgpsController: ', () => {
    it('get -> getRunningOperators', (done) => {
        const starttime = 1354233601999999;
        const endtime = 1354233602000001;
        const expectation = {
            "result": [
                "CD",
                "PO",
                "HN",
                "D2",
                "RD",
                "CF",
                "SL"
            ],
            "statusCode": 200
        }

        chai.request(app)
            .get(`/task1/${starttime}/${endtime}/`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.deep.include(expectation);
                done();
            });
    });

    it('get -> getVehiclesIDList', (done) => {
        const starttime = 1354233601999999;
        const endtime = 1354233602000001;
        const operator = "HN";
        const expectation = {
            "result": [
                33452,
                33453,
                33223,
                33552,
                43042,
            ],
            "statusCode": 200
        };

        chai.request(app)
            .get(`/task2/${starttime}/${endtime}/${operator}/`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.deep.include(expectation);
                done();
            });
    });

    it('get -> getVehiclesAtStop', (done) => {
        const starttime = 1354233601999999;
        const endtime = 1354233602000001;
        const operator = "HN";
        const expectation = {
            "result": [
                33453,
                33223
            ],
            "statusCode": 200
        };

        chai.request(app)
            .get(`/task3/${starttime}/${endtime}/${operator}/`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.deep.include(expectation);
                done();
            });
    });

    it('get -> getVehicleTrace', (done) => {
        const starttime = 1354233601999999;
        const endtime = 1354233602000001;
        const vehicleID = 33223;
        const expectation = {
            "result": [
                {
                    "timestamp": 1354233602000000,
                    "lon": -6.2786,
                    "lat": 53.417
                }
            ],
            "statusCode": 200
        };

        chai.request(app)
            .get(`/task4/${starttime}/${endtime}/${vehicleID}/`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.deep.include(expectation);
                done();
            });
    });

    //TODO: Unhappy flow tests
});
