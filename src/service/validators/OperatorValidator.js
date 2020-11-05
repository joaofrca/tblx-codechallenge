const OPERATOR_CHAIN = [validateNullOrEmpty, validateOperatorLength];

const OPERATOR_LENGTH = 2;

/**
 * Validates an Operator data.
 * @param {JSON} data 
 */
function validateOperatorData(data) {
    OPERATOR_CHAIN.forEach((validate) => validate(data));
}

/**
 * Validates if a given data is Null or Empty.
 * @param {JSON} data 
 */
function validateNullOrEmpty(data) {
    if (!data || data == null || data == undefined) throw createBadRequestError('Data cannot be null.');
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
 * Creates a Bad Request error.
 * @param {String} msg 
 */
function createBadRequestError(msg) {
    let error = new Error(msg);
    error.status = 400;
    return error;
}

module.exports = { validateOperatorData, };
