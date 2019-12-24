// IMportant requires 
const mysql = require('mysql');
const express = require('express');
const Users = require('./routes/Users');
const Auth = require('./routes/Auth');
const app = express();
app.use(express.json());

// 
app.use('/api/Users', Users);
//app.use('/api/Auth', Auth);
// the port where the application run
const port = process.env.PORT || 6000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

// importannt Exports
module.exports.app= app;