const axios = require("axios");
const API_KEY = process.env.IMAGES_API_KEY;

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: `https://soccer.sportmonks.com/api/v2.0/players/search`,
      headers: {
        "accept-encoding": "*",
      },
    });
  }

  getPlayerImage = (playerName) => {
    return this.api.get(`/${playerName}?api_token=${API_KEY}`);
  };
}

module.exports = ApiService;
