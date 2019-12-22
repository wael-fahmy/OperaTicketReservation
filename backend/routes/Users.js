const config = require('config');
const isImageUrl = require('is-image-url');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
//const sendgrid = require('sendgrid');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const nodeMailer = require('nodemailer');
//const sgMail = require('@sendgrid/mail');
const express = require('express');
const router = express.Router();
const Author= require('../models/Author.model');



//Forgot Password

router.post('/ForgotPassword', async (req, res) => {
  const { error } = Mailvalidate(req.body);
  if (error) return res.status(400).send({"ReturnMsg":error.details[0].message});
  let user = await User.findOne({ UserEmail: req.body.UserEmail.toLowerCase() });
  if(!user)  return res.status(400).send({"ReturnMsg":"User Doesn't Exist"});
  const token = jwt.sign({ UserEmail:req.body.UserEmail.toLowerCase() }, config.get('jwtPrivateKey'), {expiresIn: '1h'});
let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'geeksreads@gmail.com',
              pass: 'AaBb1234'
          }
      });
  let mailOptions = {
     from: 'no-reply@codemoto.io',
to: user.UserEmail,
subject: 'Assign New Password',
text: 'Hello,\n\n' + 'Please Click on this link to change your Password: \nhttp:\/\/' + req.headers.host + '/api/users/ChangeForgottenPassword/.\n Copy And Paste this Verification Code to change your password :\n' +token+'\n' };
let info = await transporter.sendMail(mailOptions);
transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
res.status(200).send({"ReturnMsg":"An Email has been Sent to change your Forgotten Password " + req.body.UserEmail.toLowerCase() + "."});
//res.header('x-auth-token', token).send(_.pick(user, ['_id', 'UserName', 'UserEmail']));
});
});

//Change Forgotten Password From Email token

router.post('/ChangeForgotPassword', auth, async (req, res) => {

  let check = await User.findOne({ UserEmail: req.user.UserEmail });
  if (!check) return res.status(400).send({"ReturnMsg":"User Doesn't Exist"});
  const user = await User.findOne({UserEmail: req.user.UserEmail }).select('-UserPassword');
  const { error } = NewPasswordOnlyValidate(req.body);
  if (error) return res.status(400).send({"ReturnMsg":error.details[0].message});
//  console.log(user);
const salt = await bcrypt.genSalt(10);
user.UserPassword = await bcrypt.hash(req.body.NewUserPassword, salt);
await user.save();
res.status(200).send({
  "ReturnMsg": "Update Successful"
});

});



//Signs Out Users

router.post('/SignOut', auth, async (req, res) => {

  let check = await User.findOne({ UserId: req.user._id });
  if (!check) return res.status(400).send({"ReturnMsg":"User Doesn't Exist"});
  res.status(200).send({
  "ReturnMsg": "Signed out Successfully"
  });

});



//get current User

 router.all('/me', auth, async (req, res) => {
   //let check = await User.findOne({ UserId: req.user._id });
   //if (!check) return res.status(400).send({"ReturnMsg":"User Doesn't Exist"});
   const user = await User.findById(req.user._id).select('-UserPassword  -_id  -__v ');
   var NoOfFollowings = user.FollowingUserId.length;
   var NoOfFollowers = user.FollowersUserId.length;
   var Result={
     "NoOfFollowings":NoOfFollowings,
     "NoOfFollowers":NoOfFollowers,
     "UserId":user.UserId,
     "UserEmail":user.UserEmail,
     "UserName":user.UserName,
     "Photo":user.Photo,
     "UserBirthDate":user.UserBirthDate
   }
   res.status(200).send(Result);
 });




 //Get Info by UserID
router.all('/GetUserById', auth, async (req, res) => {
  //let check = await User.findOne({ UserId: req.user._id });
  //if (!check) return res.status(400).send({"ReturnMsg":"User Doesn't Exist"});
  const userdisplay = await User.findOne({ UserId: req.body.UserId }).select('-UserPassword  -_id  -__v ');
  if (!userdisplay) return res.status(400).send({  "ReturnMsg" : "User Doesn't Exist" });
  var NoOfFollowings = userdisplay.FollowingUserId.length;
  var NoOfFollowers = userdisplay.FollowersUserId.length;
  var x;
  let finding = await User.findOne({ UserId: req.user._id, FollowingUserId:req.body.UserId  });
  if (finding) x= "True";
  if(!finding) x= "False";
  var Result={
    "NoOfFollowings":NoOfFollowings,
    "NoOfFollowers":NoOfFollowers,
    "UserId":userdisplay.UserId,
    "UserEmail":userdisplay.UserEmail,
    "UserName":userdisplay.UserName,
    "Photo":userdisplay.Photo,
    "UserBirthDate":userdisplay.UserBirthDate,
    "IsFollowing":x
  }
  res.status(200).send(Result);
});





//////////get user by id////////////
router.get('/getUser',async(req,res)=>{

  const {error}=validateUserOnly(req.body);
  if (error) return res.status(400).send(error.details[0].message);

const GettingUser=new User();

GettingUser=User.findById({UserId: req.body.UserId},'UserName UserEmail UserBirthDate Photo FollowingAuthorId FollowingUserId FollowersUserId Read WantToRead Reading Confirmed',(err,doc)=>
{
  if(err) { res.status(400).send("uset doesn't exist!")}

       if(!doc) { res.status(400).send("error while retrieving data!")}
       if(doc)
       { res.status(200).send(doc)}

})

})

///////////////////////////////




//Verify From Email Link

router.post('/verify', auth, async (req, res) => {

  let check = await User.findOne({ UserEmail: req.user.UserEmail });
  if (!check) return res.status(400).send({"ReturnMsg":"User Doesn't Exist"});
  const user = await User.findOne({UserEmail: req.user.UserEmail }).select('-UserPassword');
//  console.log(user);
  user.Confirmed = true;
  user.save();
//  const token = user.generateAuthToken();

  res.status(200).send({
    "ReturnMsg": "User Confirmed"
  });
});



//Sign Up Api sends verification mail

router.post('/SignUp', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send({"ReturnMsg":error.details[0].message});
  let user = await User.findOne({ UserEmail: req.body.UserEmail.toLowerCase() });
  if (user) return res.status(400).send({"ReturnMsg":"User already registered."});

user = new User ({
  "UserName":req.body.UserName,
  "UserEmail":req.body.UserEmail.toLowerCase(),
  "UserPassword":req.body.UserPassword
});
const salt = await bcrypt.genSalt(10);
user.UserId = user._id;
user.UserPassword = await bcrypt.hash(user.UserPassword, salt);
await user.save();
const token = jwt.sign({ UserEmail:req.body.UserEmail.toLowerCase() }, config.get('jwtPrivateKey'));
let transporter = nodeMailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
              user: 'geeksreads@gmail.com',
              pass: 'AaBb1234'
          }
      });
  let mailOptions = {
     from: 'no-reply@codemoto.io',
to: user.UserEmail,
subject: 'Account Verification Token',
text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/verify\/'+ token +'.\n' };
let info = await transporter.sendMail(mailOptions);
transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
res.status(200).send({"ReturnMsg":"A verification email has been sent to " + user.UserEmail + "."});
//res.header('x-auth-token', token).send(_.pick(user, ['_id', 'UserName', 'UserEmail']));
});
});






//Update User Password

router.post('/UpdateUserPassword', auth, async (req, res) => {
    //let check = await User.findOne({ UserId: req.user._id });
    //if (!check) return res.status(400).send({"ReturnMsg":"User Doesn't Exist"});
    const { error } = NewPassWordValidate(req.body);
    if (error) return res.status(400).send({"ReturnMsg":error.details[0].message});
    const user = await User.findById(req.user._id);
    const validPassword = await bcrypt.compare(req.body.OldUserPassword, user.UserPassword);
    if (!validPassword) return res.status(400).send({"ReturnMsg":"Invalid Old password."});
    const salt = await bcrypt.genSalt(10);
    user.UserPassword = await bcrypt.hash(req.body.NewUserPassword, salt);
    await user.save();
    res.status(200).send({
      "ReturnMsg": "Update Successful"
    });
  });




//Update User Information (Name, Photo, Bithdate)

router.post('/UpdateUserInfo', auth, async (req, res) => {
  //let check = await User.findOne({ UserId: req.user._id });
  //if (!check) return res.status(400).send({"ReturnMsg":"User Doesn't Exist"});
  const { error } = DateValidate(req.body);
  if (error) return res.status(400).send({"ReturnMsg":error.details[0].message});
  const user = await User.findById(req.user._id).select('-UserPassword');
  if(req.body.NewUserPhoto!=null)
  {
    var piccheck=await isImageUrl(req.body.NewUserPhoto);
    if(!piccheck) return res.status(400).send({"ReturnMsg":"Invalid Image"});
    user.Photo= req.body.NewUserPhoto;
  }
  if(req.body.NewUserName!=null) user.UserName = req.body.NewUserName;
  if(req.body.NewUserBirthDate!=null) user.UserBirthDate = req.body.NewUserBirthDate;
  await user.save();
  res.status(200).send({
    "ReturnMsg": "Update Successful"
  });
});

// book a ticket 









module.exports = router;
