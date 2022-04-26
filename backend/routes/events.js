const router = require('express').Router();
const {uploadImage, addEvent, getEvent, deleteEvent, updateEvent}= require('../controllers/event')
const multer = require('multer');
const {storage} = require('../cloudinary/index');
const upload = multer({storage});

router.post('/uploadImage',upload.array('image'),uploadImage);
router.post('/addEvent',addEvent);
router.get('/getEvents',getEvent);
router.delete('/deleteEvent/:id',deleteEvent);
router.put('/updateEvent/:id',updateEvent);

module.exports = router;
