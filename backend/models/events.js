const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    club: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    startdate: {
        type: Date,
    },
    registrationUrl: {
        type: String,
    },
    enddate: {
        type: Date,
    },
    venue: {
        type: String,
    },
}, { timestamps: true });

const Event = mongoose.model("Event",eventSchema);
module.exports = Event;

// Schema : Structure
// Model : Setting the Structure in MongoDB