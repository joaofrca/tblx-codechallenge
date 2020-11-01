const busgpsController = require('../controller/busgpsController');

const routes = (app) => {
    app.route('/task1/:starttime/:endtime')
        .get(busgpsController.getRunningOperators);
    app.route('/task2/:starttime/:endtime/:operator')
        .get(busgpsController.getVehiclesIDList);
    app.route('/task3/:starttime/:endtime/:operator')
        .get(busgpsController.getVehiclesAtStop);
    app.route('/task4/:starttime/:endtime/:vehicleID')
        .get(busgpsController.getVehicleTrace);
    //TODO ADD 404 ERROR ROUTE
    app.get('/', (req, res) =>
        res.send('Node and Express server runnig...')
    );
};

module.exports = { routes };