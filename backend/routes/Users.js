const isImageUrl = require('is-image-url');
const auth = require('../middleware/auth');
//const sendgrid = require('sendgrid');
//const sgMail = require('@sendgrid/mail');
const express = require('express');
const router = express.Router();
const app = require("../app")
const db = require("../db")




//Signs Out Users

router.post('/SignOut', auth, async (req, res) => {

  let check = await User.findOne({ UserId: req.user._id });
  if (!check) return res.status(400).send({"ReturnMsg":"User Doesn't Exist"});
  res.status(200).send({
  "ReturnMsg": "Signed out Successfully"
  });

});



//get current User

 router.get('/me', async (req, res) => {
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

});




 //Get Info by UserID
router.all('/GetUserById', auth, async (req, res) => {
  res.status(200).send(Result);
});





//////////get user by id////////////
router.get('/getUser',async(req,res)=>{


})

///////////////////////////////




//Update User Information (Name, Photo, Bithdate)

router.post('/UpdateUserInfo', auth, async (req, res) => {
  //let check = await User.findOne({ UserId: req.user._id });
  //if (!check) return res.status(400).send({"ReturnMsg":"User Doesn't Exist"});
});

// book a ticket 

// cancel the booking 







module.exports = router;
