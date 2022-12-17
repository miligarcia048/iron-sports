const express = require("express");
const router = express.Router();

const Favorites = require("../models/Favorites.model");
const Teams = require("../models/Teams.model");
const Players = require("../models/Players.model");
const User = require("../models/User.model");

const { isLoggedIn } = require("../middleware/route-guard");

router.get("/favorites", isLoggedIn, async (req, res, next) => {
  try {
    let currentUserPopulated = await User.findById(
      req.user._id
    ).populate("favorites teams players");

    const favourites = currentUserPopulated.favorites;
    const teams = currentUserPopulated.teams;
    const players = currentUserPopulated.players;

    console.log(req.user._id);
    console.log(favourites);
    console.log(teams);
    
    res.render("favorites", {
      favourites,
      teams,
      players
    });
  } catch (error) {
    next(error);
  }
});

router.post("/favorites", isLoggedIn, async (req, res, next) => {
  try {
    const { name, flag } = req.body;
    let favoriteLeague = await Favorites.findOne({
      name,
    });
    if (!favoriteLeague) {
      favoriteLeague = await Favorites.create({
        name,
        flag,
      });
    }
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          favorites: favoriteLeague._id,
        },
      },
      {
        new: true,
      }
    );
    res.redirect("/favorites");
  } catch (error) {
    next(error);
  }
});

router.post("/favorites/teams", isLoggedIn, async (req, res, next) => {
  try {
    const { name, flag } = req.body;

    let favoriteTeam = await Teams.findOne({
      name,
    });

    if (!favoriteTeam) {
      favoriteTeam = await Teams.create({
        name,
        flag,
      });
    }
    
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          teams: favoriteTeam._id,
        },
      },
      {
        new: true,
      }
    );
    res.redirect("/favorites");
  } catch (error) {
    next(error);
  }
});

router.post("/favorites/players", isLoggedIn, async (req, res, next) => {
  try {
    const { name, flag } = req.body;

    let favoritePlayer = await Players.findOne({
      name,
    });

    if (!favoritePlayer) {
      favoritePlayer = await Players.create({
        name,
        flag,
      });
    }

    await User.findByIdAndUpdate(
      req.user._id,
      {
        $push: {
          players: favoritePlayer._id,
        },
      },
      {
        new: true,
      }
    );
    res.redirect("/favorites");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
