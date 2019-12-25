var bodyParser = require("body-parser");
var mysql = require("mysql");


function UPLOAD_ROUTER(router, connection) {
  var self = this;
  self.handleRoutes(router, connection);
}
UPLOAD_ROUTER.prototype.handleRoutes = function (router, connection) {
  //router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());
  //Add New User SignUp

};
module.exports = UPLOAD_ROUTER;