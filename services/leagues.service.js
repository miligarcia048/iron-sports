const axios = require("axios");
const API_KEY = process.env.FOOTBALL_API_KEY;

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: `https://v3.football.api-sports.io/leagues`,
      headers: {
        "accept-encoding": "*",
        "x-apisports-key": API_KEY,
      },
    });
  }

  getAllLeagues = () => {
    return this.api
      .get(this.baseURL)
      .then((response) => {

        const selectedLeagues = [];

        response.data.response.forEach(element => {
          if (
            element.league.id === 140 ||
            element.league.id === 135 ||
            element.league.id === 78 ||
            element.league.id === 61 ||
            element.league.id === 39
            ) {
              selectedLeagues.push(element);
              console.log(selectedLeagues);
          }
        });
        return selectedLeagues;
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

module.exports = ApiService;