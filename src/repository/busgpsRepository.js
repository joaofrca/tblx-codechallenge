const mongoose = require("mongoose");
const { BusGpsSchema } = require("../model/busgps");
const BusGps = mongoose.model("BusGps", BusGpsSchema);

/**
 * Finds an array of busgps entries by query.
 * @param {JSON} filter mongoose filter.
 * @returns Promise<BusGPS>
 */
async function getBusGpsByQuery(filter) {
    return await BusGps.find(filter);
}

module.exports = { getBusGpsByQuery };
