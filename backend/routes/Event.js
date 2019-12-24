const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
// creat event 

router.get('/Create', async (req, res) => {
    Id = req.body.userId;
    console.log(Id);
    let sql = "CAll GetUserById("+Id+")"
    db.query(sql,(err, rows )=>
  {
    result = JSON.stringify(rows)
    res.send("hello")
    console.log (result.userId)
  
  }
   )
  




// delete event 



//get reserved  Chairs 


//vecant chairs