var bodyParser = require("body-parser");
var mysql = require("mysql");


function HALLS_ROUTER(router, connection) {
  var self = this;
  self.handleRoutes(router, connection);
}

HALLS_ROUTER.prototype.handleRoutes = function (router, connection) {
  //router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  router.post('/Create', async (req, res) => {
    Number_Cols = req.body.Number_Cols
    Number_Rows = req.body.Number_Rows

    let sql = "CAll CreateHAll(" + Number_Cols + "," + Number_Rows + ")"
    connection.query(sql, (err, rows) => {
      if (err) {
        console.log(err)

        res.status(400).send({ message: "something went wrong" })
      }

      res.status(200).send({ message: "added Successfully" })
    })
  })

  // GET  event 

  router.post('/get/Available', async (req, res) => {
    let sql = "CAll GetAllAvailableHall()"
    connection.query(sql, (err, rows) => {
      res.send(rows[0])
    })
  })


  // GET hall by id 

  router.post('/get/Id', async (req, res) => {

    ID = req.query.ID
    let sql = "CAll GetHallById(" + ID + ")"
    connection.query(sql, (err, rows) => {
      res.send(rows[0])
    })
  })



  // GET hall by id 

};

// ------------------------------------------------------------------------------------- //

module.exports = HALLS_ROUTER;