const Event = require('../models/events');
const multer = require('multer');
const {storage} = require('../cloudinary/index');
const upload = multer({storage});
const cloudinary = require('cloudinary').v2;
const Catch = require('../utils/catchAsync');


module.exports.uploadImage =async(req,res,next) =>{
    try{
        const image=  new Event(req.body.image);
        image.images = req.files.map(f => ({url: f.path,filename: f.filename}));
        await image.save().then((i) =>{
            res.status(200).json({
                success:true,
                message:`Image upload successfully`,
            })
        });
        console.log(image);
    }
    catch(e){
        res.status(401).json(e);
    }
}


module.exports.addEvent = Catch(async (req, res) => {
    try {
        
        const { name, club, description, venue, url, file, pin, startdate, enddate } = req.body;
        
        if (!name || !club) {
            return res.json({
                success: false,
                error: "Please add All The Required Feilds"
            });
        }
        
        if (parseInt(pin) !== parseInt(0987)) {
            return res.json({
                success: false,
                error: "Invalid PIN"
            });
        }
        
        const newEvent = Event({
            name, club, description, venue, file, startdate, enddate,
            registrationUrl: url
        });
        

        await newEvent.save().then((a) => {
            res.status(201).json({
                success: true,
                message: "Event Added Successfully"
            })
        })
    }
    catch (e) {
        res.status(500).json({
            success: false,
            error: e
        });
    }
});

module.exports.getEvent = Catch(async (req, res) => {
    try {
        const eventName = await Event.find({});
        res.status(200).json({ events: eventName });
    }
    catch (e) {
        res.status(401).json(e);
    }
});

module.exports.deleteEvent = async(req,res) =>{
    try{
        await Event.findByIdAndDelete(req.params.id,{
            new:true
            }).then(() =>{
                res.status(201).json({
                    message:"Event Deleted Successfully"
                });
            })
        }catch(e){
            res.status(401).json(e);
    }
}



module.exports.updateEvent = (req,res) =>{
    Event.findOne({name:req.body.eventName}, (err,batch) =>{
        if(err){
            res.status(400).json({
                "message": "Unable to search for the Event!"
            })
        }
        if(!eventName){
            res.status(404).json({
                "message": "Event not found!"
            })
        }
        if(eventName){
            try{
                Event.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                }).then(() =>{
                    console.log("Event Updated Successfully");
                    res.status(201).json({
                        message:"Event Updated Successfully"
                    });
                })
            }
            catch(e){
                res.status(401).json(e);
            }
        }
    })
}
