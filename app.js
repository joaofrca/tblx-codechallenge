const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/route/routes");
const config = require("./configuration/config");
const app = express();
const environment = process.env.NODE_ENV;
const { logger } = require("./configuration/loggerConfig");

logger.info("environment: " + environment);

const port = config[environment].PORT;
const dbURL = config[environment].DB_URL;

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const dbConnection = mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => logger.debug("MongoDB connected..."));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes.routes(app);

app.use(function (req, res, next) {
    const err = new Error('Not Found.');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    // console.log(JSON.stringify(err))
    // const statusCode = err.status || 500;
    // const error = {error: err.message, statusCode: statusCode};
    // res.status(error.statusCode).send(error.error);
    res.status(err.status || 500).send(err.message);
});

const server = app.listen(port, () =>
    logger.debug(`Server running on port ${port}`)
);

function stop() {
    server.close();
}

module.exports = { app, stop, dbConnection }
