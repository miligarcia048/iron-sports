const express = require("express");
const router = express.Router();

const ApiService = require("../services/leagues.service");
const apiService = new ApiService();

const ImageService = require("../services/images.service");
const User = require("../models/User.model");
const imageService = new ImageService();

router.get("/leagues", async (req, res, next) => {
  try {
    let user;
    
    if ( req.user) {
      user = await User.findById(req.user._id).populate("favorites");
    }

    const allCompetitions = await apiService.getAllCompetitions();
    res.render("leagues/leagues", {
      competitions: allCompetitions.data.competitions,
      user,
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

    const leagueStandings = await apiService.getLeagueStandings(leagueCode);

    console.log(leagueStandings.data);
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
    console.log(selectedTeam.data.runningCompetitions[0].name);
    res.render("leagues/team-info", {
      team: selectedTeam.data,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
