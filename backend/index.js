const express = require("express");
const port = 8000;
// const passportJWT=require('./config/passport-jwt');
const app = express();
// app.use(express.urlencoded());
// app.get("/", function (req, res) {
//   console.log("request received");
//   return res.status(401).json({ message: "Welcome to CodeZone from Backend" });
// });
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running server");
  } else {
    console.log("Server running successfully");
  }
});
