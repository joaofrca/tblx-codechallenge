const BusgpsController = require('../controller/BusgpsController');

const routes = (app) => {
    app.route('/task1/:starttime/:endtime')
        .get(BusgpsController.getRunningOperators);
    app.route('/task2/:starttime/:endtime/:operator')
        .get(BusgpsController.getVehiclesIDList);
    app.route('/task3/:starttime/:endtime/:operator')
        .get(BusgpsController.getVehiclesAtStop);
    app.route('/task4/:starttime/:endtime/:vehicleID')
        .get(BusgpsController.getVehicleTrace);
    app.get('/', (req, res) =>
        res.send('Node and Express server runnig...')
    );
};

module.exports = { routes };