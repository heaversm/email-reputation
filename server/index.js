const path = require("path");
let dotenv = require("dotenv").config();
const axios = require("axios");

const express = require("express");

const PORT = process.env.PORT || 3001;

const API_KEY = dotenv.parsed.API_KEY;

const app = express();
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  res.json({ message: "Connected to Server" });
});

app.get("/getrep/:email", (req, res) => {
  const email = req.params.email;

  axios
    .get(`https://emailrep.io/${email}`, {
      headers: {
        Key: API_KEY,
        "User-Agent": "vc-email-rep",
      },
    })
    .then((response) => {
      console.log("success", response.data);
      res.json(response.data);
    })
    .catch((err) => {
      console.error(err);
      res.json({
        error: `there was an error with your reputation request: ${err.statusText}`,
        details: err.statusText,
      });
    });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
