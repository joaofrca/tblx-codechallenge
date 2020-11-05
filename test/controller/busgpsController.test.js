const busgpsService = require('../../src/service/BusgpsService');
const { app } = require('../../app');

const chai = require('chai');
const chaiHTTP = require('chai-http');
const { expect } = chai;

chai.use(chaiHTTP);

describe('Test BusgpsController: ', () => {
    it('get -> getRunningOperators', (done) => {
        const starttime = "2012-11-30T00:00:01";
        const endtime = "2012-11-30T00:14:43";
        const expectation = {
            "result": [
                "CD",
                "PO",
                "HN",
                "D2",
                "RD",
                "CF",
                "SL",
                "D1"
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
        const starttime = "2012-11-30T00:00:01";
        const endtime = "2012-11-30T00:14:43";
        const operator = "CD";
        const expectation = {
            "result": [
                38054,
                33518,
                33298,
                33297,
                33407,
                43026,
                43028,
                33358,
                33608,
                33288,
                33296,
                33359,
                33195,
                38061,
                33294,
                43024,
                38053,
                38062
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
        const starttime = "2012-11-30T00:00:01";
        const endtime = "2012-11-30T00:14:43";
        const operator = "CD";
        const expectation = {
            "result": [
                33359,
                43024,
                33407,
                43028,
                33296,
                33288,
                33298,
                33294,
                38054,
                38061,
                33518
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
        const starttime = "2012-11-30T00:00:01";
        const endtime = "2012-11-30T00:10:00";
        const vehicleID = 43028;
        const expectation = {
            "result": [
                {
                    "timestamp": 1354233643000000,
                    "lon": -6.412478,
                    "lat": 53.321712
                },
                {
                    "timestamp": 1354234198000000,
                    "lon": -6.42835,
                    "lat": 53.340199
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

    it('get -> error inserting URL', (done) => {
        const starttime = "2012-11-30T00:00:01";
        const endtime = "2012-11-30T00:14:43";
        const expectation = "Not Found."

        chai.request(app)
            .get(`/task1/${starttime}/${endtime}/errorURL`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.text).to.deep.include(expectation);
                done();
            });
    });

});
