const Feedback = require('../models/feedback'); 

const addFeedback = async (req, res) => {
    console.log(req.body);
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.status(201).json({
        success: true,
        message:"Feedback Added"
    })
};

const getFeedbacks = async (req, res) => {
    await Feedback.find({}).then((s) => {
        res.status(201).json({ feedback: s });
    })
}


module.exports = {
    addFeedback,
    getFeedbacks
};