const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    name: {
        type: String,

    },
    rollNo: {
        type: String,

    },
    colorRate: {
        type: Number,

    },
    animationRate: {
        type: Number,

    },
    overallRate: {
        type: Number,

    },
    themeLaunchRate: {
        type: Number,

    },
    suggestion: {
        type: String,

    }
}, {
    timestamps:true
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;