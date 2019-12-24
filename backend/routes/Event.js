
var bodyParser = require("body-parser");
var mysql = require("mysql");
// create event 
function EVENTS_ROUTER(router, connection) {
  var self = this;
  self.handleRoutes(router, connection);
}

EVENTS_ROUTER.prototype.handleRoutes = function(router, connection) {
  //router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  // create event 

router.post('/Create', async (req, res) => {
  Id = req.body.userId;
  console.log(Id);
  Event_Name =req.body.Event_Name
  Event_Description =req.body.Event_Description 
  Event_Poster =req.body.Event_Poster
  Event_DateTime=req.body.Event_Date
  Event_Time=req.body.Event_Time
  Hall_Number=req.body.Hall_Number

  let sql = "CAll AddEvent(" + Event_Name + "," + Event_Description + "," + Event_Poster + "," + Event_Date + "," + Event_Time + "," + Hall_Number+")"
  connection.query(sql,(err, rows )=>
{   if(err)
  {
    res.status(400).send("something went wrong")      
  }

   res.status(200).send("added Successfully")
 // console.log (rows)
})
})



router.post('/Update', async (req, res) => {
Id = req.body.Id;
Event_Name =req.body.Event_Name
Event_Description =req.body.Event_Description 
Event_Poster =req.body.Event_Poster
Event_Date=req.body.Event_DateTime
Hall_Number=req.body.Hall_Number

let sql = "CAll UpdateEvent(" + Id +  ","+ Event_Name + "," + Event_Description + "," + Event_Poster + "," + Event_DateTime + "," + Hall_Number+")"
connection.query(sql,(err, rows )=>
{   if(err)
{
  res.status(400).send("something went wrong")      
}

 res.status(200).send("added Successfully")
// console.log (rows)
})
})


// delete event 

router.post('/delete', async (req, res) => {
  Id = req.body.Id;
  
  let sql = "CAll DeleteEvent(" +Id+")"
  connection.query(sql,(err, rows )=>
{
  if(err)
  {
    res.status(400).send("something went wrong")      
  }
  res.status(200).send("deleted Successfully")
 // console.log (rows)
})
})

router.post('/get', async (req, res) => {

  let sql = "CAll GetAllEvent()"
  connection.query(sql,(err, rows )=>
{
  if(err)
  {
    res.status(400).send("something went wrong")      
  }
res.status(200).send(rows)

})
})



router.post('/getbyid', async (req, res) => {
  Id = req.body.Id;
  
  let sql = "CAllGetEventByID(" +Id+")"
  connection.query(sql,(err, rows )=>
{
    if(err)
    {
      res.status(400).send("something went wrong")      
    }
  res.status(200).send(rows)
 // console.log (rows)
})
})
};

//vecant chairs

module.exports = EVENTS_ROUTER;
