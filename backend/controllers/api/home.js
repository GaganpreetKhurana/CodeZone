// const User = require("../../models/user");
// const jwt = require("jsonwebtoken");
module.exports.home = function (req, res) {
    console.log("helllo");
  return res.json(200, { message: "Welcome to CodeZone from Backend" });
};
