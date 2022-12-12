const express = require("express");
const router = express.Router();

const ApiService = require("../services/leagues.service");
const apiService = new ApiService();

const ImageService = require("../services/images.service");
const imageService = new ImageService();

router.get("/leagues", async (req, res, next) => {
  try {
    const allCompetitions = await apiService.getAllCompetitions();
    //console.log(allCompetitions.data.competitions);
    res.render("leagues/leagues", {
      competitions: allCompetitions.data.competitions,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/leagues/:leagueID/teams", async (req, res, next) => {
  try {
    const { leagueID } = req.params;
    const leagueTeams = await apiService.getLeagueTeams(leagueID);
    const leagueMatches = await apiService.getLeagueMatches(leagueID);
    const leagueCode = leagueMatches.data.competition.code;

    const leagueStandings = await apiService.getLeagueMatches(leagueCode);

    //console.log(leagueStandings.data);
    res.render("leagues/teams", {
      teams: leagueTeams.data.teams,
      matches: leagueMatches.data.matches,
      league: leagueStandings.data,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/leagues/:teamID/team", async (req, res, next) => {
  try {
    const { teamID } = req.params;
    const selectedTeam = await apiService.getOneTeam(teamID);
    console.log(selectedTeam.data);
    res.render("leagues/team-info", {
      team: selectedTeam.data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
