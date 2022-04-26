const router = require('express').Router();
const { addFeedback, getFeedbacks } = require('../controllers/feedback'); 


router.post('/addFeedback',addFeedback);
router.get('/getFeedbacks',getFeedbacks);

module.exports = router;