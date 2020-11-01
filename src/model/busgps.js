const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BusGpsSchema = new Schema({
    timestamp: { //Timestamp micro since 1970 01 01 00:00:00 GMT
        type: Number,
    },
    lineID: {
        type: String,
    },
    direction: {
        type: Number,
    },
    journeyPatternID: {
        type: String,
    },
    timeframe: { //Time Frame (The start date of the production time table - in Dublin the production time table starts at 6am and ends at 3am)
        type: Date,
    },
    vehicleJourneyID: { //Vehicle Journey ID (A given run on the journey pattern)
        type: Number,
    },
    operator: { //Operator (Bus operator, not the driver)
        type: String,
        minlength: 2,
        maxlength: 2
    },
    congestion: { //Congestion [0=no,1=yes]
        type: Boolean,
    },
    lon: { //Lon WGS84
        type: Number,
    },
    lat: { //Lat WGS84
        type: Number,
    },
    delay: { //Delay (seconds, negative if bus is ahead of schedule)
        type: Number,
    },
    blockID: { //Block ID (a section ID of the journey pattern)
        type: Number,
    },
    vehicleID: {
        type: Number,
    },
    stopID: {
        // type: Number,
    },
    atStop: { //At Stop [0=no, 1=yes]
        type: Boolean,
    },
});

const BusGps = mongoose.model("BusGps", BusGpsSchema);

function buildVehicleTrace(timestamp, lon, lat) {
    return {
        "timestamp": timestamp,
        "lon": lon,
        "lat": lat
    };
}

module.exports = {
    BusGps: BusGps,
    buildVehicleTrace,
}

// timestamp,lineID,direction,journeyPatternID,timeframe,vehicleJourneyID,operator,congestion,lon,lat,delay,blockID,vehicleID,stopID,atStop