
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
  
  Event_Name = req.body.Event_Name
  Event_Description =req.body.Event_Description 
  Event_Poster =req.body.Event_Poster
  Event_DateTime=req.body.Event_DateTime
  Hall_Number=req.body.Hall_Number

  let sql = "CAll AddEvent('" + Event_Name + "','" + Event_Description + "','" + Event_Poster + "','" +Event_DateTime + "'," + Hall_Number+")"
  console.log(sql)
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
Event_DateTime=req.body.Event_DateTime
Hall_Number=req.body.Hall_Number

let sql = "CAll UpdateEvent(" + Id +  ",'"+ Event_Name + "','" + Event_Description + "','" + Event_Poster + "','" + Event_DateTime + "'," + Hall_Number+")"
connection.query(sql,(err, rows )=>
{   if(err)

{  console.log(err)

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
res.status(200).send(rows[0])

})
})



router.get('/getbyid', async (req, res) => {
  Id = req.query.Id;
  console.log(Id)
  let sql = "CAll GetEventByID(" +Id+")"
  connection.query(sql,(err, rows )=>
{
    if(err)
    {
      res.status(400).send("something went wrong")      
    }
  res.status(200).send(rows[0])
 // console.log (rows)
})
})


router.post('/Info', async (req, res) => {
  eventId = req.body.eventId;
  hallId = req.body.hallId;
  let sql = "CAll GetHallById("+ hallId +")"
 
  connection.query(sql,(err, rows )=>
{
    if(err)
    {
      res.status(400).send("something went wrong")      
    }  
    r =rows[0][0].Number_Rows 
    c= rows[0][0].Number_Cols
    array= zeros([r,c])
    let sql = "CAll  GetTicketByEvent(" +eventId+")"
    connection.query(sql,(err, rows )=>
    { 

      if(err)
      {
        res.send("Something went wrong")
      }
      n=rows[0].length
      for (i=0 ;i<n;i++)
      {
        r1= rows[0][i].Seat_Row
        c1= rows[0][i].Seat_Col
        array[r1][c1]=1
      }
      console.log(array)
      res.send(array)

    })
  
    
 // console.log (rows)

})
function zeros(dimensions) {
  var array = [];

  for (var i = 0; i < dimensions[0]; ++i) {
      array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
  }

  return array;
}

})
};
//vecant chairs

module.exports = EVENTS_ROUTER;