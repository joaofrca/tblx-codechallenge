const BusgpsService = require('../service/BusgpsService');
const { logger } = require("../../configuration/loggerConfig");
//err: any, req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response<ResBody>, next: NextFunction

/**
 * Gets a Running Operators List for a given starttime and endtime.
 * @param {Request<P, ResBody, ReqBody, ReqQuery>} req 
 * @param {Response<ResBody>} res 
 * @param {NextFunction} next 
 */
async function getRunningOperators(req, res, next) {
    try {
        const operators = await BusgpsService.getRunningOperators(req.params);
        returnOK(res, operators);
    } catch (err) {
        next(err);
    }
}

/**
 * Gets a Vehicle List for a given starttime, endtime and operator/fleet.
 * @param {Request<P, ResBody, ReqBody, ReqQuery>} req 
 * @param {Response<ResBody>} res 
 * @param {NextFunction} next 
 */
async function getVehiclesIDList(req, res, next) {
    try {
        const vehiclesIDs = await BusgpsService.getVehiclesIDList(req.params);
        returnOK(res, vehiclesIDs);
    } catch (err) {
        next(err);
    }
}

/**
 * Gets a Vehicle List At Stop for a given starttime, endtime and operator/fleet.
 * @param {Request<P, ResBody, ReqBody, ReqQuery>} req 
 * @param {Response<ResBody>} res 
 * @param {NextFunction} next 
 */
async function getVehiclesAtStop(req, res, next) {
    try {
        const vehiclesAtStop = await BusgpsService.getVehiclesAtStop(req.params);
        returnOK(res, vehiclesAtStop);
    } catch (err) {
        next(err);
    }
}

/**
 * Gets the Vehicle Trace for a given starttime, endtime and vehicleID.
 * @param {Request<P, ResBody, ReqBody, ReqQuery>} req 
 * @param {Response<ResBody>} res 
 * @param {NextFunction} next 
 */
async function getVehicleTrace(req, res, next) {
    try {
        const vehicleTrace = await BusgpsService.getVehicleTrace(req.params);
        returnOK(res, vehicleTrace);
    } catch (err) {
        next(err);
    }
}

/**
 * Creates a response object and sends it back with 200 statusCode.
 * @param {Response<ResBody>} res 
 * @param {JSON} result contains the expected result from each of the calls.
 */
function returnOK(res, result) {
    const OK = 200;
    const response = { result: result, statusCode: OK };
    logger.info("Successful call");
    res.status(OK).json(response);
}

module.exports = { getRunningOperators, getVehiclesIDList, getVehiclesAtStop, getVehicleTrace };
