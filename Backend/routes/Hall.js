var bodyParser = require("body-parser");
var mysql = require("mysql");


function HALLS_ROUTER(router, connection) {
    var self = this;
    self.handleRoutes(router, connection);
}

HALLS_ROUTER.prototype.handleRoutes = function(router, connection) {
    //router.use(bodyParser.urlencoded({ extended: false }));
    router.use(bodyParser.json());
    
router.post('/Create', async (req, res) => {
    Number_Cols =req.body.Number_Cols
    Number_Rows =req.body.Number_Rows 
  
    let sql = "CAll CreateHAll(" + Number_Cols + "," + Number_Rows +")"
    connection.query(sql,(err, rows )=>
  {
    res.send("added Successfully")
    console.log (rows)
  })
})
  

// GET  event 

router.get('/get/Available', async (req, res) => {
    let sql = "CAll GetAllAvailableHall()"
    connection.query(sql,(err, rows )=>
  {
    res.send(rows)
  })
})
  

// GET hall by id 

router.get('/get/Id', async (req, res) => {
    
    ID=req.query.ID
    let sql = "CAll GetHallById("+ ID +")"
    connection.query(sql,(err, rows )=>
  {
    res.send(rows)
  })
})



// GET hall by id 

router.get('/get/Id', async (req, res) => {
    
    ID=req.query.ID
    let sql = "CAll GetHallById("+ ID +")"
    connection.query(sql,(err, rows )=>
  {
    res.send(rows)
  })
})

};  

// ------------------------------------------------------------------------------------- //

module.exports = HALLS_ROUTER;