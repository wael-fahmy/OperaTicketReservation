const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const app = require("../app")
const db = require("../db")
// create event 

router.post('/Create', async (req, res) => {
    Id = req.body.userId;
    console.log(Id);
    Event_Name =req.body.Event_Name
    Event_Description =req.body.Event_Description 
    Event_Poster =req.body.Event_Poster
    Event_Date=req.body.Event_Date
    Event_Time=req.body.Event_Time
    Hall_Number=req.body.Hall_Number

    let sql = "CAll AddEvent(" + Event_Name + "," + Event_Description + "," + Event_Poster + "," + Event_Date + "," + Event_Time + "," + Hall_Number+")"
    db.query(sql,(err, rows )=>
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
    db.query(sql,(err, rows )=>
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
    db.query(sql,(err, rows )=>
  {
    if(err)
    {
      res.status(400).send("something went wrong")      
    }
  res.status(200).send(rows)
 
})
})



router.post('/get/id', async (req, res) => {
    Id = req.body.Id;
    
    let sql = "CAllGetEventByID(" +Id+")"
    db.query(sql,(err, rows )=>
  {
      if(err)
      {
        res.status(400).send("something went wrong")      
      }
    res.status(200).send(rows)
   // console.log (rows)
  })
})

//vecant chairs

module.exports = router;
