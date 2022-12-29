const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/companies", (req, res) => {
  res.send([
    {
      id: 1,
      company: "Github",
    },
  ]);
});

module.exports = { app };
