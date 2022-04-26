const mongoose = require("mongoose");
require('dotenv').config();
const FRONTEND_URL = process.env.FRONTEND_URL;
mongoose.connect(FRONTEND_URL).then(() => {
    console.log(`DATABASE CONNECTED`);
}).catch((e) => {
    console.log(`DATABASE NOT CONNECTED`);
})