const axios = require("axios");
const API_KEY = process.env.NEWS_API_KEY;


class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: "https://v3.football.api-sports.io",
      headers: { "accept-encoding": "*" },
    });
  }

  getAllLeagues = () => {
    return this.api.get('/leagues');
}
}

module.exports = ApiService;
