var path = require("path");
const express = require("express");
const cors = require("cors");
const mockAPIResponse = require("./mockAPI.js");
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const app = express();

app.use(express.static("build"));
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(path.resolve("./build/index.html"));
});

// designates what port the app will listen to for incoming requests
const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
app.listen(port, function () {
  console.log(`Server running on ${host}:${port}`);
});

app.get("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.post("/test", function (req, res) {
  res.send(mockAPIResponse);
});

app.post("/api", async function (req, res) {
  const receivedUrl = req.body.url;
  const params = {
    key: process.env.API_KEY,
    url: receivedUrl,
  };
  try {
    const data = await fetch(
      process.env.BASE_URL +
        `?${Object.entries(params)
          .map((e) => e.join("="))
          .join("&")}`,
    );
    const json = await data.json();
    const jsonFiltered = Object.assign(json, { status: data.status });
    res.json(jsonFiltered);
  } catch (error) {
    console.log(error);
  }
});
