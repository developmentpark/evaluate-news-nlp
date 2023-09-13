var path = require("path");
const express = require("express");
const cors = require("cors");
const mockAPIResponse = require("./mockAPI.js");

const app = express();

app.use(express.static("build"));
app.use(cors());

console.log(__dirname);

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("./build/index.html"));
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
  console.log("Example app listening on port 8080!");
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});
