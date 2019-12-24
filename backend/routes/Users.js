var bodyParser = require("body-parser");
var mysql = require("mysql");


function USER_ROUTER(router, connection) {
  var self = this;
  self.handleRoutes(router, connection);
}
USER_ROUTER.prototype.handleRoutes = function(router, connection)
{
  //router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());
    //Add New User SignUp
    router.post("/SignUp", function(req, res)
    {
      query = "CALL AddUser(?,?,?,?,?,?,?,?,?,?);"
      if (!(req.body["userAddress"]))
    {
        req.body["userAddress"] = "No Address Entered"
    }
      Table = 
      [
        req.body["UserName"],
        req.body["User_Password"],
        req.body["First_Name"],
        req.body["Last_Name"],
        req.body["Birth_Date"],
        req.body["Gender"],
        req.body["City"],
        req.body["User_Address"],
        req.body["Email"],
        req.body["Title"]
      ];
      query = mysql.format(query, Table);
      connection.query(query, function(err, rows)
      {
        if (err) 
        {
          console.log(err);
          res.json({ Error: true, Message: "Error executing MySQL query AddUser"});
        } else 
        {
          res.json(rows[0]);
        }
      });
    });

    router.post("/SignIn", function(req, res) {
      query = "CALL SignIn(?,?);"
      myTable = [
        req.body["UserName"],
        req.body["User_Password"]
      ];
      query = mysql.format(query, myTable);
      connection.query(query, function(err, rows) {
        if (err) {
          console.log(err);
          res.json({ Error: true, Message: "Error executing MySQL query SignIn"});
        } else {
          
          if (rows[0][0].response != 0){
            return res.status(403).send({ auth: false, message: "Wrong User Credentials!" });
          }else{
            //Send the response = 0  and all user data
            res.status(200).send({ response: rows[0][0].response, userData: rows[1][0] });
            
          }
                
        }
      });
    });



    router.post("/DeleteUser", function(req, res)
    {
      query = "CALL DeleteUser(?);"
      myTable = 
      [
        req.body["ID"]
      ];
      query = mysql.format(query, myTable);
      connection.query(query, function(err, rows) 
      {
        if (err) 
        {
          console.log(err);
          res.json({ Error: true, Message: "Error executing MySQL query DeleteUser"});
        } else 
        {
          res.json(rows[0]);
        }
      });
    });


    router.all("/GetVerifiedUser", function(req, res) 
    {
      query = 'CALL GetVerifiedUser();'
      connection.query(query, function(err, rows) 
      {
        if (err)
        {
          console.log(err);
          res.json({ Error: true, Message: "Error executing MySQL query GetVerifiedUser" });
        } else
        {
          res.json(rows[0]);
        }
      });
    });

    router.all("/GetNonVerifiedUser", function(req, res)
    {
      query = 'CALL GetNonVerifiedUser();'
      connection.query(query, function(err, rows)
      {
        if (err)
        {
          console.log(err);
          res.json({ Error: true, Message: "Error executing MySQL query GetNonVerifiedUser" });
        } else 
        {
          res.json(rows[0]);
        }
      });
    });


    router.all("/VerifyUser", function(req, res) {
      query = "CALL VerifyUser(?);"
      var userID = req.body["id"];
      query = mysql.format(query, userID);
      connection.query(query, function(err, rows) {
        if (err) {
          console.log(err);
          res.json({ Error: true, Message: "Error executing MySQL query VerifyUser"});
        } else {
          res.json(rows[0]);
        }
      });
    });

    //Update User Information (Name, Photo, Bithdate)

    router.post('/UpdateUserInfo',  async (req, res) => {
      query = "CALL AddUser(?,?,?,?,?,?,?,?,?,?);"
      if (!(req.body["userAddress"]))
    {
        req.body["userAddress"] = "No Address Entered"
    }
      Table = 
      [

        req.body["First_Name"],
        req.body["Last_Name"],
        req.body["Birth_Date"],
        req.body["Gender"],
        req.body["City"],
        req.body["User_Address"],
        req.body["Email"]

      ];
      query = mysql.format(query, Table);
      connection.query(query, function(err, rows)
      {
        if (err) 
        {
          console.log(err);
          res.json({ Error: true, Message: "Error executing MySQL query AddUser"});
        } else 
        {
          res.json(rows[0]);
        }
      });
    });
};
module.exports = USER_ROUTER;
// //Signs Out Users

// router.post('/SignOut', auth, async (req, res) => {

//   let check = await User.findOne({ UserId: req.user._id });
//   if (!check) return res.status(400).send({"ReturnMsg":"User Doesn't Exist"});
//   res.status(200).send({
//   "ReturnMsg": "Signed out Successfully"
//   });

// });



// //get current User

//  router.get('/me', async (req, res) => {
//   Id = req.body.userId;
//   console.log(Id);
//   let sql = "CAll GetUserById("+Id+")"
//   db.query(sql,(err, rows )=>
// {
//   result = JSON.stringify(rows)
//   res.send("hello")
//   console.log (result.userId)

// }
//  )

// });




//  //Get Info by UserID
// router.all('/GetUserById', auth, async (req, res) => {
//   res.status(200).send(Result);
// });





// //////////get user by id////////////
// router.get('/getUser',async(req,res)=>{


// })

// ///////////////////////////////





// book a ticket 

// cancel the booking 








