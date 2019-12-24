// IMportant requires 
const mysql = require('mysql');
const express = require('express');
const Users = require('./routes/Users');
const Events = require('./routes/Event');
const Halls = require('./routes/Hall');
const Reservations = require('./routes/Reservatios');
const app = express.Router();


//To Avoid CORS Errors.
app.use(function(req, res, next) 
{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    //res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
  

// 
app.use('/api/Users', Users);
app.use('/api/Halls', Halls);
app.use('/api/Events', Events);
app.use('/api/Reservations', Reservations);
// the port where the application run
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// importannt Exports
module.exports.app= app;
