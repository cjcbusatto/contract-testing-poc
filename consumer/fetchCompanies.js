const axios = require("axios");

async function fetchCompanies(req, res) {
  const response = await axios.get("http://127.0.0.1:3000/");

  return res.json(response.data);
}

module.exports = {
  fetchCompanies,
};
