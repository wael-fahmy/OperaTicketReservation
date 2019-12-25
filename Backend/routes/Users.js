var bodyParser = require("body-parser");
var mysql = require("mysql");


function USER_ROUTER(router, connection) {
  var self = this;
  self.handleRoutes(router, connection);
}
USER_ROUTER.prototype.handleRoutes = function (router, connection) {
  //router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());
  //Add New User SignUp
  router.post("/SignUp", function (req, res) {
    query = "CALL AddUser(?,?,?,?,?,?,?,?,?,?);"
    if (!(req.body["userAddress"])) {
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
    connection.query(query, function (err, rows) {
      if (err) {
        console.log(err);
        res.json({ Error: true, Message: "Error executing MySQL query AddUser" });
      } else {
        res.status(200).send(rows)
      }
    });
  });

  router.post("/SignIn", function (req, res) {
    query = "CALL SignIn(?,?);"
    myTable = [
      req.body["UserName"],
      req.body["User_Password"]
    ];
    query = mysql.format(query, myTable);
    connection.query(query, function (err, rows) {
      if (err) {
        console.log(err);
        res.json({ Error: true, Message: "Error executing MySQL query SignIn" });
      } else {

        if (rows[0][0].response != 0) {
          return res.status(403).send({ auth: false, message: "Wrong User Credentials! or not Verified Yet" });
        } else {
          //Send the response = 0  and all user data
          res.status(200).send({ response: rows[0][0].response, user: rows[1][0] });

        }

      }
    });
  });



  router.post("/DeleteUser", function (req, res) {
    query = "CALL DeleteUser(?);"
    myTable =
      [
        req.body["ID"]
      ];
    query = mysql.format(query, myTable);
    connection.query(query, function (err, rows) {
      if (err) {
        console.log(err);
        res.json({ Error: true, Message: "Error executing MySQL query DeleteUser" });
      } else {
        res.status(200).send(rows)
      }
    });
  });
  router.all("/GetAllUser", function (req, res) {
    let sql = "CAll GetAllUser()"
    connection.query(sql, (err, rows) => {
      if (err) {
        res.status(400).send("something went wrong")
      }
      res.status(200).send(rows)

    })
  });

  router.all("/GetVerifiedUser", function (req, res) {
    let sql = "CAll GetVerifiedUser()"
    connection.query(sql, (err, rows) => {
      if (err) {
        res.status(400).send("something went wrong")
      }
      res.status(200).send(rows)

    })
  });

  router.all("/GetNonVerifiedUser", function (req, res) {
    let sql = "CAll GetNonVerifiedUser()"
    connection.query(sql, (err, rows) => {
      if (err) {
        res.status(400).send("something went wrong")
      }
      res.status(200).send(rows)

    })
  });


  router.all("/VerifyUser", function (req, res) {
    query = "CALL VerifyUser(?);"
    var userID = req.body["ID"];
    query = mysql.format(query, userID);
    connection.query(query, function (err, rows) {
      if (err) {
        console.log(err);
        res.json({ Error: true, Message: "Error executing MySQL query VerifyUser" });
      } else {
        res.status(200).send(rows)
      }
    });
  });

  //Update User Information (Name, Photo, Bithdate)

  router.post('/UpdateUserInfo', async (req, res) => {
    query = "CALL UpdateUserInfo(?,?,?,?,?,?,?,?);"
    Table =
      [
        req.body["ID"],
        req.body["First_Name"],
        req.body["Last_Name"],
        req.body["Birth_Date"],
        req.body["Gender"],
        req.body["City"],
        req.body["User_Address"],
        req.body["Email"]

      ];
    query = mysql.format(query, Table);
    connection.query(query, function (err, rows) {
      if (err) {
        console.log(err);
        res.json({ Error: true, Message: "Error executing MySQL query UpdateUserInfo" });
      } else {
        res.status(200).send(rows)
      }
    });
  });


  router.post('/UpdateUserPassword', async (req, res) => {
    query = "CALL UpdateUserPassword(?,?);"
    Table =
      [
        req.body["ID"],
        req.body["User_Password"]
      ];
    query = mysql.format(query, Table);
    connection.query(query, function (err, rows) {
      if (err) {
        console.log(err);
        res.json({ Error: true, Message: "Error executing MySQL query UpdateUserPassword" });
      } else {
        res.status(200).send(rows)
      }
    });
  });

  router.post('/UpdateUserTitle', async (req, res) => {
    query = "CALL ChangeUserTitle(?,?);"
    Table =
      [
        req.body["ID"],
        req.body["Title"]
      ];
    query = mysql.format(query, Table);
    connection.query(query, function (err, rows) {
      if (err) {
        console.log(err);
        res.json({ Error: true, Message: "Error executing MySQL query ChangeUserTitle" });
      } else {
        res.status(200).send(rows)
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








