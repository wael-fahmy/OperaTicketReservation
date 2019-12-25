var express = require("express");
var mysql = require("mysql");
var application_root = __dirname;
var app = express();


// IMportant requires 


var Users = require('./routes/Users.js');
var Events = require('./routes/Event.js');
var Halls = require('./routes/Hall.js');
var Reservations = require('./routes/Reservatios.js');


function REST() {
  var self = this;
  self.connectMysql();
}

//To Avoid CORS Errors.
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  //res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

REST.prototype.connectMysql = function () {
  var self = this;
  var pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    //password: "root",
    database: "Opera_Reservation_System",

    debug: false
  });

  pool.getConnection(function (err, connection) {
    if (err) {
      self.stop(err);
    } else {
      self.configureExpress(connection);
    }
  });
};
// 

REST.prototype.configureExpress = function (connection) {
  var self = this;
  app.use(express.json());
  var UsersRouter = express.Router();
  var EventsRouter = express.Router();
  var HallsRouter = express.Router();
  var ReservationsRouter = express.Router();


  app.use('/api/Users', UsersRouter);
  app.use('/api/Halls', HallsRouter);
  app.use('/api/Events', EventsRouter);
  app.use('/api/Reservations', ReservationsRouter);

  //Instantiate the Routes:
  new Users(UsersRouter, connection);
  new Halls(HallsRouter, connection);
  new Events(EventsRouter, connection);
  new Reservations(ReservationsRouter, connection);

  self.startServer();
};


REST.prototype.startServer = function () {
  app.use(express.static(application_root + '/static'))
  app.listen(3000, function () {
    console.log("Server running at port 3000");
  });
};

REST.prototype.stop = function (err) {
  console.log("ISSUE WITH MYSQL -" + err);
  process.exit(1);
};

//creates the server
new REST();