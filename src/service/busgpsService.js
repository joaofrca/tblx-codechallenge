
const busgpsRepository = require('../repository/busgpsRepository');
const busgpsDataValidator = require('./validators/busgpsDataValidator');
const TimeValidator = require('./validators/timeValidator');
const busgpsModel = require('../model/busgps');

/**
 * Validates input from @params, calls the repository query, and retrieves the list of Running Operators.
 * @param {JSON} params 
 */
async function getRunningOperators(params) {
    TimeValidator.validateStartAndEndData(params.starttime, params.endtime);
    const query = getRunningOperatorsQuery(params);
    TimeValidator.validateStartIsBeforeEnd(query.timestamp.$gte, query.timestamp.$lte);

    let runningOperators = [];
    const busGpsEntries = await busgpsRepository.getBusGpsByQuery(query)
    busGpsEntries.forEach(entry => {
        runningOperators.push(entry.operator);
    });
    return runningOperators.filter(removeDuplicates);
}

/**
 * Validates input from @params, calls the repository query, and retrieves the list of Vehicles IDs for an Operator.
 * @param {JSON} params 
 */
async function getVehiclesIDList(params) {
    busgpsDataValidator.validateTimeStampData(params);
    busgpsDataValidator.validateOperatorData(params);
    const query = getVehiclesIDListQuery(params);

    let vehiclesIDs = [];
    const busGpsEntries = await busgpsRepository.getBusGpsByQuery(query)
    busGpsEntries.forEach(entry => {
        vehiclesIDs.push(entry.vehicleID);
    });
    return vehiclesIDs.filter(removeDuplicates);
}

/**
 * Validates input from @params, calls the repository query, and retrieves the list of Vehicles IDs At Stop for an Operator.
 * @param {JSON} params 
 */
async function getVehiclesAtStop(params) {
    busgpsDataValidator.validateTimeStampData(params);
    busgpsDataValidator.validateOperatorData(params);
    const query = getVehiclesAtStopQuery(params);

    let vehiclesAtStop = [];
    const busGpsEntries = await busgpsRepository.getBusGpsByQuery(query)
    busGpsEntries.forEach(entry => {
        if (entry.atStop) vehiclesAtStop.push(entry.vehicleID);
    });
    return vehiclesAtStop.filter(removeDuplicates);
}

/**
 * Validates input from @params, calls the repository query, and retrieves the Vehicles Trace for a Vehicle.
 * @param {JSON} params 
 */
async function getVehicleTrace(params) {
    busgpsDataValidator.validateTimeStampData(params);
    busgpsDataValidator.validateVehicleIDData(params);
    const query = getVehicleTraceQuery(params);

    let vehicleTrace = [];
    const busGpsEntries = await busgpsRepository.getBusGpsByQuery(query)
    busGpsEntries.forEach(entry => {
        if (entry.atStop) vehicleTrace.push(busgpsModel.buildVehicleTrace(entry.timestamp, entry.lon, entry.lat));
    });
    return vehicleTrace.sort(increasingOrder);;
}

module.exports = { getRunningOperators, getVehiclesIDList, getVehiclesAtStop, getVehicleTrace };


/**
* Retrieves a list of BusGps Object for any given query.
* @param {JSON} params 
*/
function getBusGpsByQuery(query) {
    return busgpsRepository.getBusGpsByQuery(query);
}

/**
 * Converts ISO 8601 datatimes to timestamp in microseconds.
 * @param {String} datatime ISO 8601 format
 */
function convertDataToTimeStamp(datatime) {
    const date = new Date(datatime);
    const microseconds = date.getTime() * 1000;
    console.log(microseconds);
    console.log("joao2");
    return microseconds;
}

/**
 * Removes duplicates.
 * @param {*} elem 
 * @param {*} index 
 * @param {*} self 
 */
function removeDuplicates(elem, index, self) {
    return index == self.indexOf(elem);
}

/**
 * Checks for ascending order.
 * @param {Number} a 
 * @param {Number} b 
 */
function increasingOrder(a, b) {
    return a.timestamp - b.timestamp;
}

/**
 * Returns a filter for Running Operators for Mongo DB.
 * @param {JSON} params 
 */
function getRunningOperatorsQuery(params) {
    return {
        "timestamp": { "$gte": convertDataToTimeStamp(params.starttime), "$lte": convertDataToTimeStamp(params.endtime) }
    };
}

/**
 * Returns a filter for Vehicles IDs for Mongo DB.
 * @param {JSON} params 
 */
function getVehiclesIDListQuery(params) {
    return {
        "timestamp": { "$gte": convertDataToTimeStamp(params.starttime), "$lte": convertDataToTimeStamp(params.endtime) },
        "operator": params.operator
    };
}

/**
 * Returns a filter for Vehicles IDs At Stop for Mongo DB.
 * @param {JSON} params 
 */
function getVehiclesAtStopQuery(params) {
    return {
        "timestamp": { "$gte": convertDataToTimeStamp(params.starttime), "$lte": convertDataToTimeStamp(params.endtime) },
        "operator": params.operator
    };
}

/**
 * Returns a filter for Vehicle Trace for Mongo DB.
 * @param {JSON} params 
 */
function getVehicleTraceQuery(params) {
    return {
        "timestamp": { "$gte": convertDataToTimeStamp(params.starttime), "$lte": convertDataToTimeStamp(params.endtime) },
        "vehicleID": params.vehicleID
    };
}