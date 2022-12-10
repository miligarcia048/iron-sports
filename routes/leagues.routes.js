const express = require("express");
const router = express.Router();

const ApiService = require("../services/leagues.service");
const apiService = new ApiService();

const ImageService = require("../services/images.service");
const imageService = new ImageService();

router.get("/leagues", async (req, res, next) => {
  try {
    const allCompetitions = await apiService.getAllCompetitions();
    console.log(allCompetitions.data.competitions);
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
    ~console.log(leagueMatches.data.matches);
    res.render("leagues/teams", {
      teams: leagueTeams.data.teams,
      matches: leagueMatches.data.matches,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/leagues/:teamID/team", async (req, res, next) => {
  try {
    const { teamID } = req.params;
    const listOfPlayers = [];

    const selectedTeam = await apiService.getOneTeam(teamID);

    const allPlayers = await selectedTeam.data.squad;

    allPlayers.forEach((player) => {
      for (let key in player) {
        if (key === "name") {
          listOfPlayers.push(player[key]);
        }
      }
    });
    console.log(listOfPlayers);
    let newList = [];
    for (let i = 0; i < listOfPlayers.length; i++) {
      let newImage = await imageService.getPlayerImage(listOfPlayers[i]);
      console.log(newImage);
      let newPlayer = {
        name: listOfPlayers[i],
        image: newImage.data.data.image_path,
      };
      newList.push(newPlayer);
    }

    console.log(newList);

    res.render("leagues/team-info", {
      team: newList,
      // player: [getPlayerImage.data.data[0]]
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
