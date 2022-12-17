const axios = require("axios");

class ApiService {
  constructor() {
    this.calls = 0;
    this.apiKeysMap = {
      0: process.env.FOOTBALL_API_KEY,
      1: process.env.SECOND_FOOTBALL_API_KEY,
      2: process.env.THIRD_FOOTBALL_API_KEY
    };
    this.apiKey = this.apiKeysMap[0];
    this.api = axios.create({
      baseURL: `http://api.football-data.org/v4`,
      headers: {
        "accept-encoding": "*",
        "X-Auth-Token": this.apiKey
      }
    });
  }

  getAllCompetitions = () => {
    this.manageAmountOfCalls();
    return this.api.get("/competitions");
  };
  getLeagueStandings = leagueCode => {
    this.manageAmountOfCalls();
    return this.api.get(`/competitions/${leagueCode}/standings`);
  };
  getLeagueTeams = leagueID => {
    this.manageAmountOfCalls();
    return this.api.get(`/competitions/${leagueID}/teams`);
  };

  getLeagueMatches = leagueID => {
    this.manageAmountOfCalls();
    return this.api.get(`/competitions/${leagueID}/matches`);
  };

  getOneTeam = teamID => {
    this.manageAmountOfCalls();
    return this.api.get(`/teams/${teamID}`);
  };

  getOnePlayer = randomNumber => {
    this.manageAmountOfCalls();
    return this.api.get(`/persons/${randomNumber}`);
  };

  manageAmountOfCalls = () => {
    this.calls++;

    if (this.calls === 10) {
      this.resetAxiosInstance();
      this.calls = 0;
    }
  };

  resetAxiosInstance = () => {
    this.apiKey = this.getApiKey();

    this.api = axios.create({
      baseURL: `http://api.football-data.org/v4`,
      headers: {
        "accept-encoding": "*",
        "X-Auth-Token": this.apiKey
      }
    });
  };

  getApiKey = () => {
    const currentIndex = Number(
      Object.keys(this.apiKeysMap).find(
        key => this.apiKeysMap[key] === this.apiKey
      )
    );

    const index = currentIndex === 2 ? 0 : currentIndex + 1;

    return this.apiKeysMap[index];
  };
}

module.exports = ApiService;