const TIMESTAMP_CHAIN = [validateNullOrEmpty, validateTimeRegex];

const ISO8601Regex = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d/;

/**
 * Validates Start and End Times.
 * @param {JSON} data 
 */
function validateStartAndEndData(startdata, enddata) {
    [startdata, enddata].forEach((data) => validateTimeData(data));
}

/**
 * Validates if startTimestamp is before endTimestamp. 
 * @param {number} startTimestamp 
 * @param {number} endTimestamp 
 */
function validateStartIsBeforeEnd(startTimestamp, endTimestamp) {
    if (startTimestamp >= endTimestamp) throw createBadRequestError('StartTime cannot be bigger or equal than EndTime.');
}

/**
 * Validates a TimeStamp data.
 * @param {JSON} data 
 */
function validateTimeData(data) {
    TIMESTAMP_CHAIN.forEach((validate) => validate(data));
}

/**
 * Validates if a given data is Null or Empty.
 * @param {JSON} data 
 */
function validateNullOrEmpty(data) {
    if (!data || data == null || data == undefined) throw createBadRequestError('Data cannot be null.');
}

/**
 * Validates time is received in ISO 8601 format [YYYT-MM-DDThh:mm:ss].
 * @param {JSON} data 
 */
function validateTimeRegex(data) {
    const dateMatch = data.match(ISO8601Regex);
    if (dateMatch === null || dateMatch === undefined) throw createBadRequestError('Time should be in ISO 8601 format: YYYY-MM-DDThh:mm:ss');
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

module.exports = { validateStartAndEndData, validateStartIsBeforeEnd, };
