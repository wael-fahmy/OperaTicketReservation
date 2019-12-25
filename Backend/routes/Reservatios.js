var bodyParser = require("body-parser");
var mysql = require("mysql");


function Reservations_ROUTER(router, connection) {
  var self = this;
  self.handleRoutes(router, connection);
}

Reservations_ROUTER.prototype.handleRoutes = function (router, connection) {
  //router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  router.post('/Create', async (req, res) => {
    Event_ID = req.body.Event_ID
    UserID = req.body.UserID
    Seat_Row = req.body.Seat_Row
    Seat_Col = req.body.Seat_Col
    let sql = "CAll  NewTicket(" + Event_ID + "," + UserID + "," + Seat_Row + "," + Seat_Col + ")"
    connection.query(sql, (err, rows) => {
      if (err) {
        res.status(400).send({message: "something went wrong"})
      }

      res.status(200).send({message: "added Successfully"})
      // console.log (rows)
    })
  })

  router.post('/delete', async (req, res) => {
    Id = req.body.Id;

    let sql = "CAll DeleteTicket(" + Id + ")"
    connection.query(sql, (err, rows) => {
      if (err) {
        res.status(400).send({message: "something went wrong"})
      }
      res.status(200).send({message: "deleted Successfully"})
      // console.log (rows)
    })
  })



  router.post('/get/userId', async (req, res) => {
    Id = req.body.userId;

    let sql = "CAll  GetTicketByUserId(" + Id + ")"
    connection.query(sql, (err, rows) => {
      if (err) {
        res.status(400).send("something went wrong")
      }
      res.status(200).send(rows[0])
    })
  })

  router.get('/get/eventId', async (req, res) => {
    Id = req.query.eventId;

    let sql = "CAll  GetTicketByEvent(" + Id + ")"
    connection.query(sql, (err, rows) => {
      if (err) {
        res.status(400).send("something went wrong")
      }
      res.status(200).send(rows[0])
      // console.log (rows)
    })
  })


  router.post('/pay', async (req, res) => {
    Id = req.body.userId;

    let sql = "CAll payTicket(" + Id + ")"
    connection.query(sql, (err, rows) => {
      if (err) {
        res.status(400).send({message: "something went wrong"})
      }
      res.status(200).send({message: "paid Successfully"})
      // console.log (rows)
    })
  })
};

//vecant chairs

module.exports = Reservations_ROUTER;