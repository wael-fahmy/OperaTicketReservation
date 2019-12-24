const express = require('express');
const router = express.Router();
const app = require("../app")
const db = require("../db")
// create event 
    

router.post('/Create', async (req, res) => {
    Id = req.body.userId;
    console.log(Id);
    Event_ID =req.body.Event_ID
    UserID  =req.body.UserID 
    Seat_Row  =req.body.Seat_Row
    Seat_Col=req.body.Seat_Col
    let sql = "CAll  NewTicket(" + Event_ID + "," + UserID + "," + Seat_Row + "," + Seat_Col+")"
    db.query(sql,(err, rows )=>
  {   if(err)
    {
      res.status(400).send("something went wrong")      
    }
 
     res.status(200).send("added Successfully")
   // console.log (rows)
  })
})
    router.post('/delete', async (req, res) => {
        Id = req.body.Id;
        
        let sql = "CAll DeleteTicket(" +Id+")"
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
    
    
    
    router.get('/get/userId', async (req, res) => {
        Id = req.body.userId;
        
        let sql = "CAll  GetTicketByUserId(" +Id+")"
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
  
    router.get('/get/eventId', async (req, res) => {
        Id = req.body.eventId;
        
        let sql = "CAll  GetTicketByEvent(" +Id+")"
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

    
    router.get('/pay', async (req, res) => {
        Id = req.body.ticketId;
        
        let sql = "CAll payTicket(" +Id+")"
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
    