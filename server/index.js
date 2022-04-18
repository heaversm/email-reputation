const path = require("path");
let dotenv = require("dotenv").config();

const express = require("express");
const sdk = require("api")("@sublimesecurity/v0.3#49y4gl02wflaz");
sdk.server("https://emailrep.io");

const PORT = process.env.PORT || 3001;

const API_KEY = dotenv.API_KEY;

const app = express();
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
  // sdk.auth(API_KEY);
  res.json({ message: "Connected to Server" });
});

app.get("/getrep/:email", (req, res) => {
  const email = req.params.email;

  //TEMP:
  // res.json({
  //   error: "there was an error with your repuation request",
  //   details: "none",
  // });
  //END TEMP

  // console.log(email);
  // console.log(sdk);

  sdk
    .auth(API_KEY) //MH TODO: doesn't seem to change rate limiting, is this working?
    .get(`/${email}`)
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((err) => {
      console.error(err.statusText, err.headers);
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
