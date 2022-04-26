const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();


require("./database/db");



const eventRoutes = require('./routes/events');
const feedbackRoutes = require('./routes/feedback');


// view engine only for testing the image upload
app.set("view engine","ejs");
app.set("views", "views");


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});


// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});




const PORT = 5000 || process.env.PORT;
app.use(cors());

// app.use("/", (req, res) => {
//   res.status(201).json({ flare: "Welcome to Flare 2022" });
// })
app.use('/api/v1', eventRoutes);
app.use('/api/v1', feedbackRoutes);

// http://localhost:5000/api/v1/addFeedback
  


app.listen(PORT, () => {
    console.log("Server is Running");
});





