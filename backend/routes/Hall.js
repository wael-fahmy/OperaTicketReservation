// creeate Hall 
const express = require('express');
const router = express.Router();
const app = require("../app")
const db = require("../db")
// creat event 

router.post('/Create', async (req, res) => {
    Number_Cols =req.body.Number_Cols
    Number_Rows =req.body.Number_Rows 
  
    let sql = "CAll CreateHAll(" + Number_Cols + "," + Number_Rows +")"
    db.query(sql,(err, rows )=>
  {
    res.send("added Successfully")
    console.log (rows)
  })
})
  

// GET  event 

router.get('/get/Available', async (req, res) => {
    let sql = "CAll GetAllAvailableHall()"
    db.query(sql,(err, rows )=>
  {
    res.send(rows)
  })
})
  

// GET hall by id 

router.get('/get/Id', async (req, res) => {
    
    ID=req.query.ID
    let sql = "CAll GetHallById("+ ID +")"
    db.query(sql,(err, rows )=>
  {
    res.send(rows)
  })
})



// GET hall by id 

router.get('/get/Id', async (req, res) => {
    
    ID=req.query.ID
    let sql = "CAll GetHallById("+ ID +")"
    db.query(sql,(err, rows )=>
  {
    res.send(rows)
  })
})



module.exports = router;
