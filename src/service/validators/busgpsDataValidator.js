const TIMESTAMP_CHAIN = [validateNullOrEmpty, validateStartTimeProperty, validateStartTimeType, validateEndTimeProperty, validateEndTimeType];
const OPERATOR_CHAIN = [validateNullOrEmpty, validateOperatorLength];
const VEHICLEID_CHAIN = [validateNullOrEmpty, validateVehicleIDLength, validateVehicleIDType];

const OPERATOR_LENGTH = 2;
const VEHICLEID_LENGTH = 5;

/**
 * Validates a TimeStamp data.
 * @param {JSON} data 
 */
function validateTimeStampData(data) {
    TIMESTAMP_CHAIN.forEach((validate) => validate(data));
}

/**
 * Validates an Operator data.
 * @param {JSON} data 
 */
function validateOperatorData(data) {
    OPERATOR_CHAIN.forEach((validate) => validate(data));
}

/**
 * Validates a VehicleID data.
 * @param {JSON} data 
 */
function validateVehicleIDData(data) {
    VEHICLEID_CHAIN.forEach((validate) => validate(data));
}

/**
 * Validates if a given data is Null or Empty.
 * @param {JSON} data 
 */
function validateNullOrEmpty(data) {
    if (!data || data == null || data == undefined) throw createBadRequestError('Data cannot be null.');
}

/**
 * Validates if starttime exists.
 * @param {JSON} data 
 */
function validateStartTimeProperty(data) {
    if (!data.starttime) throw createBadRequestError('Endpoint must contain a starttime.');
}

/**
 * Validates starttime type.
 * @param {JSON} data 
 */
function validateStartTimeType(data) {
    const starttime = data.starttime;
    validateDataType(starttime);
}

/**
 * Validates if endtime exists.
 * @param {JSON} data 
 */
function validateEndTimeProperty(data) {
    if (!data.endtime) throw createBadRequestError('Endpoint must contain a endtime.');
}

/**
 * Validates endtime type.
 * @param {JSON} data 
 */
function validateEndTimeType(data) {
    const endtime = data.endtime;
    validateDataType(endtime);
}

/**
 * Validates Operator input length.
 * @param {JSON} data 
 */
function validateOperatorLength(data) {
    const operator = data.operator;
    if (!operator || !(operator.length == OPERATOR_LENGTH)) throw createBadRequestError(`Operator length must be ${OPERATOR_LENGTH} characters long.`);
}

/**
 * Validates VehicleID input length.
 * @param {JSON} data 
 */
function validateVehicleIDLength(data) {
    const vehicleID = data.vehicleID;
    if (!vehicleID || !(vehicleID.length === VEHICLEID_LENGTH)) throw createBadRequestError(`VehicleID length must be ${VEHICLEID_LENGTH} characters long.`);
}

/**
 * Validates VehicleID type.
 * @param {JSON} data 
 */
function validateVehicleIDType(data) {
    const vehicleID = data.vehicleID;
    validateDataType(vehicleID);
}

/**
 * Validates if a given data is a number.
 * @param {JSON} data 
 */
function validateDataType(data) {
    if (!isNumeric(data)) throw createBadRequestError(`${data} must be a number.`);
}

/**
 * Validates if a given string contains numeric characters only.
 * @param {JSON} str 
 */
function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
}

/**
 * Creates a Bad Request error.
 * @param {String} msg 
 */
function createBadRequestError(msg) {
    let error = new Error(msg);
    error.status = 400;
    return error;
}

module.exports = { validateTimeStampData, validateOperatorData, validateVehicleIDData };