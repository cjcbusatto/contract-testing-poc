const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { fetchCompanies } = require("./fetchCompanies");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/companies", fetchCompanies);

app.listen(3000, () => {
  console.log("Consumer is running on on port 3000");
});
