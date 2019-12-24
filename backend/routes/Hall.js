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
  

module.exports = router;
