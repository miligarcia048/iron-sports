const axios = require("axios");
const API_KEY = process.env.FOOTBALL_API_KEY;

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: `http://api.football-data.org/v4`,
      headers: {
        "accept-encoding": "*",
        "X-Auth-Token": API_KEY,
      },
    });
  }

  getAllCompetitions = () => {
    return this.api.get('/competitions');
  };

  getLeagueTeams = (leagueID) => {
    return this.api.get(`/competitions/${leagueID}/teams`);
  };

  getLeagueMatches = (leagueID) => {
    return this.api.get(`/competitions/${leagueID}/matches`);
  };

  getOneTeam = (teamID) => {
    return this.api.get(`/teams/${teamID}`);
  };

  getOnePlayer = (randomNumber) => {
    return this.api.get(`/persons/${randomNumber}`);
  };
  
}

module.exports = ApiService;