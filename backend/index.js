const express = require("express");
const port = 8000;
const db = require("./config/mongoose");
const passportJWT = require("./config/passport-jwt");
const app = express();
app.use(express.urlencoded());
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running server");
  } else {
    console.log("Server running successfully");
  }
});
